import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import './Home.css';


export default function Home() {
  const [githubUsers, setData] = useState([] as any[]);
  const navigate = useNavigate();
  
  const handleOnClick = (user_id, repos_url, followers_url, orgs_url) => {
    navigate('/user/' + user_id, {
        state:{
          repos_url,
          followers_url,
          orgs_url
        },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setData(data);
  };

  return (
    <div id="Home">
      <Container>
        <h1>Github Users</h1>
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
            {githubUsers.length && githubUsers.map((item, idx) => {
              return (
                <tr key={idx} onClick={() => handleOnClick(item.id, item.repos_url, item.followers_url, item.organizations_url)}>
                  <td>{idx+1}</td>
                  <td>{item.login}</td>
                  <td><Image width={64} height={64} src={item.avatar_url}/></td>
                  <td>{item.html_url}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}






