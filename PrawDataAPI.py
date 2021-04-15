from dotenv import load_dotenv

import os

# import praw

import asyncpraw

load_dotenv()

reddit = asyncpraw.Reddit(
    client_id=os.getenv("CLIENT_ID"),
    client_secret=os.getenv("CLIENT_SECRET"),
    user_agent=os.getenv("USER_AGENT"),
)


async def get_learnpython_10_hot_submissions():
    submission_titles = []

    subreddit = await reddit.subreddit("learnpython")

    ## for testing
    async for submission in subreddit.hot(limit=10):
        submission_titles.append(submission.title)

    return submission_titles


async def get_osuskins_top_skins():
    submissions = {"skins": []}

    skin_flairs = ["Original Skin", "Skin release", "Mixed Skin"]

    subreddit = await reddit.subreddit("osuskins")

    async for submission in subreddit.top(limit=100):
        if submission.link_flair_text in skin_flairs:
            submissions["skins"].append(
                {
                    "title": submission.title,
                    "link": f"https://reddit.com{submission.permalink}",
                }
            )

    return submissions

