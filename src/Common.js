export const toolAction = (fun) => {
  return (temp) => {
    fun && fun();
    temp && temp();
  };
};