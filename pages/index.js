import React, { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <Fragment>
    <Head>
      <title>Meetup</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Browse a huge list of highly active React" />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>;
};

// export async function getServerSideProps(context) {
//   // const req = context.req;
//   // const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://manish1234:manish1234@learning.yemzn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // To reload data
  };
}

export default HomePage;
