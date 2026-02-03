const Quiz = () => {
  return (
    <div className="flex flex-col flex-1 p-6 bg-white items-center justify-center gap-4 sm:gap-6">
      <h1 className="header">Quiz</h1>
      <div className="learnBoard">
        <div>Start</div>
        <div>Review</div>
        {/* <div className="bg-yellow-200 w-full h-60">cards</div>
        <div className="border-4 w-full h-full relative">
          <div className="bg-green-200 w-full h-32">text</div>
          <div className="bg-purple-200 w-full h-32">quiz index</div>
          <div className="absolute bottom-4 right-4 bg-violet-300 w-40 h-40">
            timer
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Quiz;
