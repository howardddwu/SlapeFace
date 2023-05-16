## SlapFace
- [Motivation](#motivation)
- [Tools](#tools)
- [Site Looks](#site-looks)
  - [Login page](#login-page)
  - [Post page](#post-page)
  - [Home page](#home-page)
- [Use this project](#use-this-project)
- [The team](#team)
- [Dev Log](#dev-log)
********************************

## Motivation
Now Hosted: Click [SlapFace](https://slapeface.netlify.app) to visit the website.

<p>
Problem:
Lack of a dedicated platform to archive and verify prophecies, which often get lost on various social media channels. This makes it difficult to track and verify the accuracy of prophecies over time.
</P> 
<p>
Provide a platform for people to share and verify prophecies. The motivation behind this idea is to have a long-term, low-maintenance website where interesting conclusions can be posted and verified later, without the fear of the post getting lost in various social media channels. The website can be used by anyone who wants to share their opinions and prophecies.
</p>

## What does the Application do
### Main idea:
- This is a website for everyone to post their “unverified” prophecy
- It can be political incidents or different field
- When anyone submit their posts, you have to set a time for to verify then everyone will see the result
### Discussion/forum:
- Every user allow to comment on others posts
### User Login System:
- Users have different account to store what they have posted or voted
- Reward points are recorded in the account
### Prophecy category:
- Technology, political, sport, entertainment, etc..
- User can choose what category to follow 
### From the Future/Get Slapped 
- This is a section for the highest points user and the lowest points user
- From the future shows the best 5 and the Get Slapped in the Face will show the worst 5.
### User reward points system
- Users who vote will consume 10 points from the account
- Users who voted the correct answer will earn points
- To determine the number of points for winners, all users points will be enter to a reward pool and distributed to the winners.
### Most Popular/ Newest Posts
- Most Popular posts will be determined by the number of users who joined the poll.
- Newest posts are the posts most recently uploaded.
### Trending News (Public API) 
- Utilizing API to get the newest news to the users. And that news will be displayed on the main page. 
- https://newscatcherapi.com/free-news-api



## Tools
- Front-end: [React](https://create-react-app.dev/) + [Ant Design](https://ant.design/) + [Bootstrap](https://getbootstrap.com)
- Back-end: [Node.js](https://nodejs.org/en/)
- Database: [MongoDB](https://www.mongodb.com/) 

## Site looks

### Login page
<p align="center">
<img width="376" alt="image" src="https://github.com/xqcxqc/SlapeFace/assets/76079094/43844446-350c-4b5a-97c2-73f63a5c59c2">
</p>

We implemented **Google** login for better user experience, but users can also register their own accounts on our site.


### Home page
<p align="center">

<img width="1512" alt="image" src="https://github.com/xqcxqc/SlapeFace/assets/76079094/ee245636-85ff-4e2a-8d02-c6747aa8ec46">
</p>
Including three sections: 
  - Left-side: Trending News
  - Middle: List of Prophecy created by users
  - Right-side: Userpoints rank(highest 5 and lowest 5) and create post button

### Rank page
<p align="center">
<img width="1512" alt="image" src="https://github.com/xqcxqc/SlapeFace/assets/76079094/d34a4806-aa42-4943-ad22-c5b5aea777bc">
</p>

Display the users with highest points respect to time. 

### Profile Page
<p align="center">
<img width="1512" alt="image" src="https://github.com/xqcxqc/SlapeFace/assets/76079094/3645d116-aabd-4141-8153-8545001ec02c">
</p>

### Prophecy
<p align="center">
screenshot needed
</p>

Users can view all prophecies they created and participated. Abd allow user to edit their info there. 

## Use this project

1. Clone this project
2. For server run

```bash
npm start
```

3. For client run
```bash
npm run start
```

4. Run both client and server
```bash
npm run dev
```
## Team
Our team consist of three members: [Haoyuan Wu](https://github.com/howardddwu), [Ying Yang](https://github.com/505539367), [Xueqi Chen](https://github.com/xqcxqc). 

## Dev Log
- 05/14/2023 The website is now hosted. Click [SlapFace](https://slapeface.netlify.app) to see.
