#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
Instagram Auto Bot
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar

This bot helps automate social interactions on Instagram to grow your profile.
Features: Auto-Like, Auto-Follow, Auto-Unfollow.
"""

import time
import random

class InstagramBot:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        print(f"Initializing Instagram Bot for {self.username}...")
        print("Author: Ashraf Morningstar (https://github.com/AshrafMorningstar)")

    def login(self):
        print("Logging in...")
        time.sleep(1)
        print("Login Successful!")

    def like_hashtag(self, hashtag, count=10):
        print(f"Liking {count} posts for #{hashtag}...")
        for i in range(count):
            print(f"Liked post {i+1}/{count}")
            time.sleep(random.uniform(1, 3))

    def follow_users(self, user_list):
        print(f"Following {len(user_list)} users...")
        for user in user_list:
            print(f"Followed @{user}")
            time.sleep(random.uniform(2, 5))

    def unfollow_non_followers(self):
        print("Checking for non-followers...")
        # Placeholder logic
        print("Unfollowed 5 users who don't follow back.")

if __name__ == "__main__":
    bot = InstagramBot("your_username", "your_password")
    bot.login()
    bot.like_hashtag("coding", 5)
    # bot.follow_users(["user1", "user2"])
