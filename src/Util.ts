export const randomNoRepeats = (max: number): number[] => {
  let nums = Array.from(Array(max).keys());
  let ranNums: number[] = [];
  let i = nums.length;

  while (i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[rand]);
    nums.splice(rand, 1);
  }
  return ranNums;
};
