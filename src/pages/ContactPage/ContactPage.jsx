import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./ContactPage.module.scss";

const schema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must be 50 characters or fewer"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name must be 50 characters or fewer"),
  subject: yup
    .string()
    .trim()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be 100 characters or fewer"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(3, "Message must be at least 3 characters")
    .max(1000, "Message must be 1000 characters or fewer"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(values) {
    console.log("Contact form:", values);
    alert("Thanks! Your message was sent (see console.log).");
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>Contact</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            className={styles.control}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            className={styles.control}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            className={styles.control}
            {...register("subject")}
          />
          {errors.subject && (
            <p className={styles.error}>{errors.subject.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={styles.control}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={6}
            className={`${styles.control} ${styles.textarea}`}
            {...register("message")}
          />
          {errors.message && (
            <p className={styles.error}>{errors.message.message}</p>
          )}
        </div>

        <p className={styles.help}>We usually reply within 1–2 business days.</p>

        <div className={styles.actions}>
          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send message"}
          </button>

        </div>
      </form>
    </section>
  );
}
