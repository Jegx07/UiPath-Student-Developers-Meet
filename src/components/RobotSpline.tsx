import { SplineScene } from "@/components/ui/splite";

export const RobotSpline = () => {
  return (
    <div className="w-[calc(100%+80px)] md:w-[calc(100%+120px)] lg:w-[calc(100%+160px)] -mx-[40px] md:-mx-[60px] lg:-mx-[80px] h-[620px] md:h-[760px] lg:h-[840px] relative overflow-visible flex items-end justify-center">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full scale-[1]"
      />
    </div>
  );
};
