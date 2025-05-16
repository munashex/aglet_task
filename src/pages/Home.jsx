import HomeImages from "../data/homeImages";
import VideoSlider from "../components/VideoSlider"; 

const Home = () => {
  return (
    <div>
      {/* Images with name and description on small & medium screens */}
      <div className=" space-y-2 lg:hidden">
        {HomeImages.map((item) => (
          <div key={item.description} className="relative">
            <img src={item.image} alt={item.description} className="w-full" />
            <div className="absolute top-[50%] left-5 space-y-2">
              <h1 className="text-xl md:text-5xl font-bold">{item.description}</h1>
              <h1 className="md:text-xl">{item.name || ''}</h1>
            </div>
          </div>
        ))}
      </div>
       
       {/* video slider components  */}
      <VideoSlider/>
    </div>
  );
};

export default Home;
