import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { type Prisma } from "@prisma/client";

const getAllProfilesInputSchema = z.object({
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
  filter: z.object({
    tag: z.string().optional(),
    isVerified: z.boolean().optional(),
    isTopContributor: z.boolean().optional(),
    search: z.string().optional(),
  }).optional(),
});

// Return type for the formatted profiles
type ProfileWithUser = Prisma.UserProfileGetPayload<{
  include: { user: { select: { userName: true; email: true } } };
}>;

// Return type for the formatted profiles
interface FormattedProfile extends Omit<ProfileWithUser, 'user'> {
  userName: string;
  email: string | null;
}


// Response type
interface GetAllProfilesResponse {
  profiles: FormattedProfile[];
  nextCursor: string | undefined;
}

export const profileRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const userId = ctx.session.user.id;
        let profile = await ctx.db.userProfile.findUnique({
          where: { userId },
        });

        if (!profile) {
          const user = await ctx.db.user.findUnique({
            where: { userId },
            select: { userName: true, email: true },
          });

          if (!user) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User not found",
            });
          }
          profile = await ctx.db.userProfile.create({
            data: {
              userId,
              tags: ["javascript", "react", "typescript", "next.js"],
              isVerified: false,
              isTopContributor: false,
              receiveNotifications: false,
              showEmail: false,
              reputation: 0,
            },
          });
        }

        // Return profile with user data
        const userData = await ctx.db.user.findUnique({
          where: { userId },
          select: {
            userName: true,
            email: true,
          },
        });

        if (!userData) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User data not found",
          });
        }

        return {
          ...profile,
          userName: userData.userName,
          email: userData.email,
        };
      } catch (error) {
        console.error("Error fetching or creating profile:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get user profile",
        });
      }
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      userName: z.string().min(3, "Username must be at least 3 characters"),
      email: z.string().email("Please enter a valid email address"),
      role: z.string().min(2, "Role is required").optional(),
      dp: z.string(),
      company: z.string().optional(),
      location: z.string().optional(),
      bio: z.string().max(500, "Bio must be less than 500 characters").optional().nullable(),
      githubUrl: z.string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
      websiteUrl: z.string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
      tags: z.array(z.string()).optional(),
      isVerified: z.boolean().default(false),
      isTopContributor: z.boolean().default(false),
      receiveNotifications: z.boolean().default(true),
      showEmail: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      try {
        const profileExists = await ctx.db.userProfile.findUnique({
          where: { userId },
        });
        const { userName, email, ...profileData } = input;

        return await ctx.db.$transaction(async (prisma) => {
          // Update user data (userName and email)
          await prisma.user.update({
            where: { userId },
            data: {
              userName,
              email,
            },
          });

          // Update or create profile
          if (profileExists) {
            return await prisma.userProfile.update({
              where: { userId },
              data: {
                ...profileData,
                updatedAt: new Date(),
              },
            });
          } else {
            return await prisma.userProfile.create({
              data: {
                userId,
                ...profileData,
              },
            });
          }
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        if (error instanceof PrismaClientUnknownRequestError) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `The already in user by another ac count`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update profile",
        });
      }
    }),

  getProfileByUsername: protectedProcedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        // Find user by username
        const user = await ctx.db.user.findUnique({
          where: { userName: input.userName },
          select: {
            userId: true,
            userName: true,
            email: true,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        // Get profile
        const profile = await ctx.db.userProfile.findUnique({
          where: { userId: user.userId },
        });

        if (!profile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Profile not found",
          });
        }

        // Only include email if showEmail is true or if it's the current user
        const isCurrentUser = user.userId === ctx.session.user.id;
        const email = profile.showEmail || isCurrentUser ? user.email : null;

        return {
          ...profile,
          userName: user.userName,
          email,
          isCurrentUser,
        };
      } catch (error) {
        console.error("Error fetching profile by username:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get profile",
        });
      }
    }),


  getAllProfiles: protectedProcedure
    .input(getAllProfilesInputSchema)
    .query(async ({ ctx, input }): Promise<GetAllProfilesResponse> => {
      const { limit, cursor, filter } = input;

      try {
        const where: Prisma.UserProfileWhereInput = {};

        if (filter?.tag) {
          where.tags = {
            has: filter.tag,
          };
        }

        if (filter?.isVerified !== undefined) {
          where.isVerified = filter.isVerified;
        }

        if (filter?.isTopContributor !== undefined) {
          where.isTopContributor = filter.isTopContributor;
        }

        const profiles = await ctx.db.userProfile.findMany({
          take: limit + 1,
          where,
          cursor: cursor ? { profileId: cursor } : undefined,
          orderBy: {
            reputation: 'desc',
          },
          include: {
            user: {
              select: {
                userName: true,
                email: true,
              },
            },
          },
        });

        let nextCursor: string | undefined = undefined;
        if (profiles.length > limit) {
          const nextItem = profiles.pop();
          nextCursor = nextItem?.profileId;
        }

        let filteredProfiles = profiles;
        if (filter?.search) {
          const search = filter.search.toLowerCase();
          filteredProfiles = profiles.filter((profile: {
            user: { userName: string },
            role?: string | null,
            company?: string | null,
            bio?: string | null
          }) =>
            profile.user.userName.toLowerCase().includes(search) ||
            (profile.role?.toLowerCase().includes(search) ?? false) ||
            (profile.company?.toLowerCase().includes(search) ?? false) ||
            (profile.bio?.toLowerCase().includes(search) ?? false)
          );
        }

        const formattedProfiles: FormattedProfile[] = filteredProfiles.map((profile) => ({
          ...profile,
          userName: profile.user.userName,
          email: profile.showEmail ? profile.user.email : null,
          user: undefined,
        }));

        return {
          profiles: formattedProfiles,
          nextCursor,
        };
      } catch (error) {
        console.error("Error fetching profiles:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get profiles",
        });
      }
    }),

  getProfileById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {

      try {
        return await ctx.db.user.findUnique({
          where: { userId: input.userId },
          include: {
            UserProfile: true,
            Question: {
              include: {
                _count: {
                  select: {
                    Answer: true,
                    QuestionLike: true,
                  }
                }
              },
              orderBy: { createdAt: "desc" }
            }
          },
        });
      } catch (error) {
        console.error("Error fetching profile by ID:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get profile",
        });
      }
    }),

});