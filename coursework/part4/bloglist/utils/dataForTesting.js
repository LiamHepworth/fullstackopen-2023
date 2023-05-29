function totalLikes(info) {
  let total = 0

  info.forEach((el) => {
    total += el.likes
  })

  return total
}

module.exports = { totalLikes }
