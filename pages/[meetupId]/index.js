import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup Detail</title>
      </Head>
      <MeetupDetail
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      image={props.meetupData.image}
    />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://manish1234:manish1234@learning.yemzn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
  client.close();
  return {
    fallback: false, // list all param id values if false, no need if true
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://manish1234:manish1234@learning.yemzn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
