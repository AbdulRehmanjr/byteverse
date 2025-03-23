import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { z } from 'zod';
import { env } from '~/env';


export const MessageSchema = z.object({
  content: z.string(),
  isFromGuest: z.boolean(),
  conversationId: z.string()
});

 
export type Message = z.infer<typeof MessageSchema>;

export class MessageEncryption {
  private static readonly algorithm = 'aes-256-gcm';
  private static readonly keyLength = 32;
  private static readonly ivLength = 12;
  private static readonly authTagLength = 16;
  
  constructor(private readonly secretKey: Buffer) {
    if (secretKey.length !== MessageEncryption.keyLength) {
      throw new Error(`Secret key must be ${MessageEncryption.keyLength} bytes`);
    }
  }

  encrypt(message: string): string {
    try {
      const iv = randomBytes(MessageEncryption.ivLength);
      const cipher = createCipheriv(
        MessageEncryption.algorithm, 
        this.secretKey, 
        iv,
        { authTagLength: MessageEncryption.authTagLength }
      );

      const encrypted = Buffer.concat([
        cipher.update(message, 'utf8'),
        cipher.final()
      ]);

      const authTag = cipher.getAuthTag();
      return Buffer.concat([iv, authTag, encrypted]).toString('base64');
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt message');
    }
  }

  decrypt(encryptedMessage: string): string {
    try {
      const data = Buffer.from(encryptedMessage, 'base64');
      
      const iv = data.subarray(0, MessageEncryption.ivLength);
      const authTag = data.subarray(
        MessageEncryption.ivLength,
        MessageEncryption.ivLength + MessageEncryption.authTagLength
      );
      const encrypted = data.subarray(MessageEncryption.ivLength + MessageEncryption.authTagLength);

      const decipher = createDecipheriv(
        MessageEncryption.algorithm, 
        this.secretKey, 
        iv,
        { authTagLength: MessageEncryption.authTagLength }
      );
      
      decipher.setAuthTag(authTag);

      return Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
      ]).toString('utf8');
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt message');
    }
  }
}

const ENCRYPTION_KEY = env.NEXT_PUBLIC_MESSAGE_ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  throw new Error('MESSAGE_ENCRYPTION_KEY environment variable is required');
}

export const messageEncryption = new MessageEncryption(
  Buffer.from(ENCRYPTION_KEY, 'base64')
);

export const encryptMessage = (content: string) => {
  return messageEncryption.encrypt(content);
};

export const decryptMessage = (encryptedContent: string) => {
  return messageEncryption.decrypt(encryptedContent);
};