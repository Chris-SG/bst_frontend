import React from 'react';
import Typography from '@material-ui/core/Typography';


export const Help = () => {
  return (
    <span>
      <Typography variant="h3">About BST</Typography>
      <Typography variant="h5">
        What is BST?
      </Typography>
      <Typography variant="body1">
        BST, or Bemani Score Tracker, is a fully online score tracker,
        {' '}
        covering as many bemani games as possible. By being a cloud-based
        {' '}
        service, it can utilize the following benefits:
        <ul>
          <li>
            Improved profile loading. A full DDR profile load takes less than 1 minute,
            {' '}
            while other services take as long as 10!
          </li>
          <li>
            Retained EA sessions, so you don&apos;t need to keep logging back in.
          </li>
          <li>
            Automatic profile updates, so you won&apos;t miss any changes to your profile.
          </li>
        </ul>
      </Typography>
      <Typography variant="h5">
        How can I use it?
      </Typography>
      <Typography variant="body1">
        Simply register an account, go to your
        {' '}
        <a href="/profile">
          profile
        </a>
        {' '}
        and login to EaGate!
        <br />
        Once you have done this, you can head over to any of the supported game pages to
        {' '}
        start tracking your stats.
      </Typography>
      <Typography variant="h3">About DDR</Typography>
      <Typography variant="h5">
        What does DDR track?
      </Typography>
      <Typography variant="body1">
        We try to track as much as possible. This includes:
        <ul>
          <li>Your current profile state</li>
          <li>Your stats on all songs, including those unavailable to you</li>
          <li>Individual scores, starting from the past 50 after your first profile update</li>
          <li>Workout data, to track your calories and playcount over time</li>
        </ul>
        In the future, this will be extended to also support:
        <ul>
          <li>Viewing and updating your settings</li>
          <li>Any other ideas? Let us know!</li>
        </ul>
      </Typography>
      <Typography variant="h5">
        What does DDR not yet support?
      </Typography>
      <Typography variant="body1">
        <ul>
          <li>Tracking for users without an EaGate subscription (in progress)</li>
          <li>Updating profile settings</li>
          <li>BST rivals</li>
          <li>Extended score listing</li>
          <li>...what do you want?</li>
        </ul>
      </Typography>
      <Typography variant="h3">About DRS</Typography>
      <Typography variant="h5">
        What does DRS track?
      </Typography>
      <Typography variant="body1">
        Just like DDR, we try to track as much as possible. Currently this includes:
        <ul>
          <li>Current profile state</li>
          <li>Profile snapshots (playcount and star count)</li>
          <li>Stats on all songs, including two player performances</li>
          <li>Individual scores, starting from the past 30 after your first profile update</li>
        </ul>
      </Typography>
      <Typography variant="h5">
        What does DRS not yet support?
      </Typography>
      <Typography variant="body1">
        <ul>
          <li>Mapping names for two-player performances</li>
          <li>Extended score listing</li>
          <li>...what do you want?</li>
        </ul>
      </Typography>
      <Typography variant="caption">
        Any suggestions? Want to contribute? Contact Bauxe#1004 on Discord. :)
      </Typography>
    </span>
  );
};
