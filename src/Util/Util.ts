export const randomNoRepeats = (max: number): number[] => {
  // keys returns array iterator (index)
  // Array(length) -> returns an emtpy array of given size
  let nums = Array.from(Array(max).keys()); // returns array with 0-max number
  let ranNums: number[] = [];
  let i = nums.length;
  while (i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[rand]);
    nums.splice(rand, 1); // remove from the index array to avoid dupes.
  }

  return ranNums;
};
