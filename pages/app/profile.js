export default function profile() {
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen">
      <div className="flex">
        <img
          width="60rem"
          className="rounded-full"
          src={`https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 50
          )}.jpg`}
        />
        <img
          width="60rem"
          className="rounded-full"
          src={`https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 50
          )}.jpg`}
        />
        <img
          width="60rem"
          className="rounded-full"
          src={`https://randomuser.me/api/portraits/women/${Math.floor(
            Math.random() * 50
          )}.jpg`}
        />
        <img
          width="60rem"
          className="rounded-full"
          src={`https://randomuser.me/api/portraits/women/${Math.floor(
            Math.random() * 50
          )}.jpg`}
        />
      </div>
      <span className="mb-4">Profile</span>
      <img
        src="https://static01.nyt.com/newsgraphics/2016/08/18/nyt-job-climate-editor/0dd71ba5d34dae7f146dd8a202c6937827243565/climate_animated.gif"
        role="Gif picture"
        width="80%"
      />
    </div>
  );
}
