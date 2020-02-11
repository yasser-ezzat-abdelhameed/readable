export default timestamp => {
  let date = new Date(timestamp)
  return date.toDateString()
}
