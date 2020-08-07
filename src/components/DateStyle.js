import React from "react"


const DateStyle = ({ date }) => {
  const dateMiliseconds = Date.parse(date)

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  var postDate = new Date(dateMiliseconds)

  var dd = postDate.getDate()

  var mm = postDate.getMonth()
  var yyyy = postDate.getFullYear()

  if (dd < 10) {
    dd = "0" + dd
  }
  postDate = monthNames[mm] + " " + dd + ", " + yyyy

  return <>{postDate}</>
}

export default DateStyle
