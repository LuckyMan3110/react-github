import { useState,useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './User.css';

export default function User() {
  const [repos, setRepos] = useState([] as any[]);
  const [followers, setFollowers] = useState([] as any[]);
  const [orgs, setOrgs] = useState([] as any[]);
  
  const navigate = useNavigate();
  const params = useLocation();
  const repos_url: string = params.state.repos_url;
  const followers_url: string = params.state.followers_url;
  const orgs_url: string = params.state.orgs_url;

  useEffect(() => {
    fetch(repos_url)
    .then(function(response){
      return response.json();
    })
    .then(function(repos) {
      setRepos(repos);
    });

    fetch(followers_url)
    .then(function(response){
      return response.json();
    })
    .then(function(followers) {
      setFollowers(followers);
    });

    fetch(orgs_url)
    .then(function(response){
      return response.json();
    })
    .then(function(orgs) {
      setOrgs(orgs);
    });
  }, []);

  return (
    <div id="User">
      <Container>
        <h1>Github Repositories<Button onClick={() => navigate('/')} id="backButton" size="lg" variant="link">Back</Button></h1>
        <Table hover variant="dark" >
          <thead>
            <tr>
              <th>No</th>
              <th>full_name</th>
              <th>visibility</th>
              <th>forks</th>
              <th>open_issues</th>
              <th>watchers</th>
              <th>default_branch</th>
            </tr>
          </thead>
          <tbody>
            {repos.length && repos.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.full_name}</td>
                  <td>{item.visibility}</td>
                  <td>{item.forks}</td>
                  <td>{item.open_issues}</td>
                  <td>{item.watchers}</td>
                  <td>{item.default_branch}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <h1>Github Followers: {followers.length}</h1>
        <Table hover variant="dark" >
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Avatar</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {followers.length && followers
            .map((item, idx) => {
              if (idx <= 4){
                return (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{item.login}</td>
                    <td><Image width={64} height={64} src={item.avatar_url}/></td>
                    <td>{item.html_url}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </Table>

        <h1>Github Organizations</h1>
        <Table hover variant="dark" >
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Avatar</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {orgs.length && orgs.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{item.login}</td>
                  <td><Image width={64} height={64} src={item.avatar_url}/></td>
                  <td>{item.description}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}




