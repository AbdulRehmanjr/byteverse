export const LandingCard = () => {
    const card =[
        {title : "For Teams " ,
        description : "Where developers and have private Knowledge sharing with coworkers",
        buttonText: "Create Teams",
        linkurl : "Try for Free",
        Image : "https://cdn.sstatic.net/Img/home/home-teams.png?v=3a3570e5f7a6"
        },
        {title :""}
    ];
    return <>
      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
        {card.map(({title, description , buttonText , linkurl , Image} ,index)=>(
             <div key={index} className="bg-blue-lg rounded-lg p-6 max-w-sm text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-700 mb-4">{description }</p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        {buttonText}
                    </button>
      </div>
        ))}
        </div>  
    </>
}