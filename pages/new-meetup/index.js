import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data);
    router.push('/')
  };
  return <Fragment>
    <Head>
      <title>Meetups | Add New Meetup</title>
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>;
};

export default NewMeetupPage;
