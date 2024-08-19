'use client';

import React from 'react';
import { Input, Textarea } from '@headlessui/react';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

import { CustomButton } from '@/components/CustomButton';
import { createUser } from '@/api/user.api';
import IUser from '@/utils/user.type';
import { useRouter } from 'next/navigation';
import { emailRegex } from '@/utils/emailRegex.constant';

const createProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  fullName: Yup.string()
    .min(4, 'At least, enter your first name')
    .max(20, 'This name is too long!')
    .required('Required'),
  jobTitle: Yup.string()
    .min(2, 'Enter more details')
    .max(30, 'Too more details')
    .required('Job title is required'),
  additionalInformation: Yup.string().max(200, 'To much details'),
});

export default function CreateProfile() {
  const router = useRouter();

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
              fullName: '',
              jobTitle: '',
              additionalInformation: '',
            }}
            validationSchema={createProfileSchema}
            onSubmit={async (values: IUser, { setSubmitting, setErrors }) => {
              try {
                const user = await createUser(values);
                if (user) {
                  enqueueSnackbar('That was easy!');
                  localStorage.setItem('userData', user.jobTitle);
                  router.push('/jobs');
                }
              } catch (error) {
                const errorMessage = 'Email already in use';
                setErrors({ email: errorMessage });
              } finally {
                setSubmitting(false);
              }
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
                    className={classNames('search__input', {
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
                    className={classNames('search__input', {
                      'border-2 border-red-400':
                        errors.password && touched.password && errors.password,
                    })}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p>Name</p>
                    <p className='text-red-400 text-sm'>
                      {errors.fullName && touched.fullName && errors.fullName}
                    </p>
                  </div>
                  <Input
                    type='fullName'
                    name='fullName'
                    placeholder='Your name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    className={classNames('search__input', {
                      'border-2 border-red-400':
                        errors.fullName && touched.fullName && errors.fullName,
                    })}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p>Job Title</p>
                    <p className='text-red-400 text-sm'>
                      {errors.jobTitle && touched.jobTitle && errors.jobTitle}
                    </p>
                  </div>
                  <Input
                    type='jobTitle'
                    name='jobTitle'
                    placeholder='Your prefered job title'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.jobTitle}
                    className={classNames('search__input', {
                      'border-2 border-red-400':
                        errors.jobTitle && touched.jobTitle && errors.jobTitle,
                    })}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p>About me</p>
                    <p className='text-red-400 text-sm'>
                      {errors.additionalInformation &&
                        touched.additionalInformation &&
                        errors.additionalInformation}
                    </p>
                  </div>
                  <Textarea
                    name='additionalInformation'
                    placeholder='Tell us more about you'
                    className='search__textArea !h-[100px]'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.additionalInformation}
                  />
                </div>

                <CustomButton
                  title='Submit'
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
