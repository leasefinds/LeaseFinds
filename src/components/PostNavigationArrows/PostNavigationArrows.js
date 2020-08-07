import React from "react"
import { Link } from "gatsby"

import styles from "./PostNavigationArrows.module.scss"

const PostNavigationArrows = ({ previous, next }) => {
  return (
    <div>
      <ul className={styles.Navigation}>
        <li>
          {previous && (
            <Link to={`${previous.uri}`} rel="prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.Left}
                width="10"
                height="34.982"
                viewBox="0 0 25.432 50.865"
              >
                <g transform="translate(153.435 50.865) rotate(180)">
                  <g transform="translate(128.003 0)">
                    <path
                      d="M153.141,24.7,129.828.327A1.06,1.06,0,1,0,128.3,1.792l22.612,23.641L128.3,49.073a1.06,1.06,0,0,0,1.532,1.465l23.314-24.373A1.062,1.062,0,0,0,153.141,24.7Z"
                      transform="translate(-128.003 0)"
                    ></path>
                  </g>
                </g>
              </svg>
              Previous
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`${next.uri}`} rel="next">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="34.982"
                viewBox="0 0 16.325 34.982"
                className={styles.Right}
              >
                <defs></defs>
                <path
                  d="M144.139,16.987,129.174.225A.65.65,0,0,0,128.212.2a.767.767,0,0,0-.021,1.031l14.515,16.259L128.191,33.75a.767.767,0,0,0,.021,1.031.649.649,0,0,0,.962-.023L144.139,18A.768.768,0,0,0,144.139,16.987Z"
                  transform="translate(-128.003 0)"
                ></path>
              </svg>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default PostNavigationArrows
