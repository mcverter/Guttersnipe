function find_intersection(r1, r2) {
  let instersection = {}

  if (r1.left_x < r2.left_x) {
    if (r2.left_x > r1.left_x + r1.width) {
      return {}
    }
    else {
      intersection.left_x = r2.left_x;
      intersection_width = min()

    }
  }

  const smaller_x = Math.min(r1.left_x, r2.left_x)
  smaller_y = Math.min(r1.bottom_y, r2.bottom_y)


}
