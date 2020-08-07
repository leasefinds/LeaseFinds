import React from "react"
import styles from "./Form.module.scss"

const Form = () => {
  //   const submitHandler = e => {
  //     e.preventDefault()
  //   }

  return (
    <div className={styles.Form}>
      <form
        className="form"
        name="LeaseFinds - Contact Us Form"
        method="POST"
        netlify-honeypot="bot-field"
        data-netlify="true"
      >
        <input
          type="hidden"
          name="form-name"
          value="LeaseFinds - Contact Us Form"
        />

        <p className="hidden">
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
        </p>

        <div className={styles.FieldWrapper}>
          <label className="screen-readers" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            placeholder="Full Name"
            name="fullName"
            type="text"
            required
          />
        </div>

        <div className={styles.FieldWrapper}>
          <label className="screen-readers" htmlFor="phone">
            Phone
          </label>

          <input
            id="phone"
            placeholder="Phone"
            name="phone"
            type="tel"
            pattern="^([0-9\(\)\/\+ \-]*)$"
            required
          />
        </div>

        <div className={styles.FieldWrapper}>
          <label className="screen-readers" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            required
          />
        </div>

        <div className={styles.FieldWrapper}>
          <label className="screen-readers" htmlFor="writeUs">
            Write Us
          </label>
          <textarea
            id="writeUs"
            placeholder="Write Us"
            name="writeUs"
            rows="4"
            required
          />
        </div>

        <div>
          <button className="btn" type="submit">
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 448 512"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
