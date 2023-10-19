import dynamic from 'next/dynamic';
const Navigation = dynamic(() => import('../components/Navigation'));
const Greetings = dynamic(() => import('../containers/Greetings'));
const Skills = dynamic(() => import('../containers/Skills'));
const Proficiency = dynamic(() => import('../containers/Proficiency'));
const Education = dynamic(() => import('../containers/Education'));
const Experience = dynamic(() => import('../containers/Experience'));
const Projects = dynamic(() => import('../containers/Projects'));
const Feedbacks = dynamic(() => import('../containers/Feedbacks'));
const GithubProfileCard = dynamic(
  () => import('../components/GithubProfileCard')
);
import { openSource, showContactUs } from '../portfolio';
import SEO from '../components/SEO';
import Contact from '../components/ContactUs';
import { GithubUserType } from '../types';

let inputdata = {
  "login": "1hanzla100",
  "id": 59178380,
  "node_id": "MDQ6VXNlcjU5MTc4Mzgw",
  "avatar_url": "https://avatars.githubusercontent.com/u/59178380?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/1hanzla100",
  "html_url": "https://github.com/1hanzla100",
  "followers_url": "https://api.github.com/users/1hanzla100/followers",
  "following_url": "https://api.github.com/users/1hanzla100/following{/other_user}",
  "gists_url": "https://api.github.com/users/1hanzla100/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/1hanzla100/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/1hanzla100/subscriptions",
  "organizations_url": "https://api.github.com/users/1hanzla100/orgs",
  "repos_url": "https://api.github.com/users/1hanzla100/repos",
  "events_url": "https://api.github.com/users/1hanzla100/events{/privacy}",
  "received_events_url": "https://api.github.com/users/1hanzla100/received_events",
  "type": "User",
  "site_admin": false,
  "name": "SAI KG",
  "company": "Freelance",
  "blog": "https://1hanzla100.github.io/",
  "location": "Frisco, USA",
  "email": null,
  "hireable": true,
  "bio": "AI/ML , Full Stack Web Developer & Blockchain Developer",
  "twitter_username": null,
  "public_repos": 13,
  "public_gists": 0,
  "followers": 112,
  "following": 2,
  "created_at": "2019-12-23T18:08:52Z",
  "updated_at": "2023-09-27T11:58:41Z"
}

export default function Home({
  inputdata,
}: {
  inputdata: any;
}) {
  return (
    <div>
      <SEO />
      <Navigation />
      <Greetings />
      <Skills />
      <Proficiency />
      <Education />
      <Experience />
      <Feedbacks />
      <Projects />
      {showContactUs ? <Contact /> : null}
      <GithubProfileCard {...inputdata} />
    </div>
  );
}

// Home.prototype = {
//   githubProfileData: PropTypes.object.isRequired,
// };

export async function getStaticProps() {
  const githubProfileData: GithubUserType = await fetch(
    `https://api.github.com/users/${openSource.githubUserName}`
  ).then((res) => res.json());

  return {
    props: { githubProfileData },
  };
}
