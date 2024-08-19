'use client';

import React from 'react';
import { Input } from '@headlessui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

import { CustomButton } from '@/components/CustomButton';
import { userLogin } from '@/api/user.api';
import { emailRegex } from '@/utils/emailRegex.constant';

const createProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password too short')
    .required('Password is required'),
});

export default function CreateProfile() {
  const router = useRouter();

  async function handleSubmit(
    values: { email: string; password: string },
    {
      setSubmitting,
      setErrors,
    }: FormikHelpers<{ email: string; password: string }>,
    router: ReturnType<typeof useRouter>
  ) {
    try {
      const user = await userLogin(values);
      if (user) {
        localStorage.setItem('userData', user.jobTitle);
        router.push('/jobs');
      }
    } catch (error) {
      const errorMessage = 'Incorrect email or password';
      setErrors({ email: errorMessage, password: ' ' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className='overflow-hidden pt-12'>
      <div className='padding-x padding-y max-width flex flex-col'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Create your own profile</h1>
          <p>To make your job search eathier</p>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={createProfileSchema}
            onSubmit={(values, formikHelpers) =>
              handleSubmit(values, formikHelpers, router)
            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                className='flex-center flex-col w-[30%]'
                onSubmit={handleSubmit}
              >
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p>Email</p>
                    <p className='text-red-400 text-sm'>
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <Input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={classNames('search__input', {
                      'border-2 border-red-400': errors.email && touched.email,
                    })}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p>Password</p>
                    <p className='text-red-400 text-sm'>
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <Input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={classNames('search__input', {
                      'border-2 border-red-400':
                        errors.password && touched.password,
                    })}
                  />
                </div>
                <CustomButton
                  title='Log In'
                  type='submit'
                  disabled={isSubmitting}
                  containerStyles='bg-primary-blue rounded-full mt-5 w-[50%]'
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
