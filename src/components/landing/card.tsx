export const LandingTestCard = () => {
  const card = [
    {
      title: "For Teams ",
      description:
        "Where developers and have private Knowledge sharing with coworkers",
      buttonText: "Create Teams",
      linkurl: "Try for Free",
      Image: "https://cdn.sstatic.net/Img/home/home-teams.png?v=3a3570e5f7a6",
    },
    { title: "" },
  ];
  return (
      <div className="flex flex-col items-center rounded-lg bg-gray-100 p-6">
        {card.map(
          ({ title, description, buttonText, linkurl, Image }, index) => (
            <div
              key={index}
              className="bg-blue-lg max-w-sm rounded-lg p-6 text-center"
            >
              <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>
              <p className="mb-4 text-gray-700">{description}</p>
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
                {buttonText}
              </button>
            </div>
          ),
        )}
      </div>
    
  );
};
