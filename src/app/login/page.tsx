'use client';

import React from 'react';
import { Input } from '@headlessui/react';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';

import { CustomButton } from '@/components/CustomButton';
import { createUser, userLogin } from '@/api/user.api';
import IUser from '@/utils/user.type';
import { useRouter } from 'next/navigation';
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function CreateProfile() {
  const router = useRouter();

  const createProfileSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .matches(emailRegex, 'Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

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
            onSubmit={async (
              values: { email: string; password: string },
              { setSubmitting }
            ) => {
              const user = await userLogin(values);
              if (user) {
                localStorage.setItem('userData', user.jobTitle);
                router.push('/jobs');
              }
              setSubmitting(false);
            }}
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
                    className={classNames('search-manufacturer__input', {
                      'border-2 border-red-400':
                        errors.email && touched.email && errors.email,
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
                    className={classNames('search-manufacturer__input', {
                      'border-2 border-red-400':
                        errors.password && touched.password && errors.password,
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
          <Input></Input>
        </div>
      </div>
    </main>
  );
}
