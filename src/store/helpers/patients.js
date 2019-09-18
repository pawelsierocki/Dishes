export const calculateAge = birthdayDate => {
  const diff = Date.now() - new Date(birthdayDate).getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
