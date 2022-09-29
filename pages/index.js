import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ launches }) {
  console.log("launches", launches);
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Launches List

        </title>
      </Head>
      <table className="table">
        <tr >
        <th>
        Mission Name  
        </th>
        <th>
          Launch Date
        </th>
        <th>
          Launch Site
        </th>
        <th>
          Rocket Name
        </th>
        </tr>
      { launches.launchesPast.map((launch) => {
        return (
         <tr key={launch.id}>
            <td><h5>{launch.mission_name}</h5></td>
            <td>{new Date(launch.launch_date_local).toLocaleDateString()}
            
            </td>
            <td>
              {launch.launch_site.site_name_long}
            </td>
            <td>
              {launch.rocket.rocket_name}
            </td>
           </tr>
           
        
        );
      })}
      </table>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getLaunches {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  console.log("data", data);
  return {
    props: {
      launches: data,
    },
  };
}
