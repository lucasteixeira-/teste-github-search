import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGithub } from "../utils/api.js";
import { Button, Container, Col, Row } from "react-bootstrap";
import { renderDados } from "../utils/funcoes";


const UserPage = () => {
    
    const [showUserInfo, setShowUserInfo] = useState(true);
    const [showUserRepos, setShowUserRepos] = useState(false);
    const [showUserStarred, setShowUserStarred] = useState(false);
    const [showMsgSemUser, setShowMsgSemUser] = useState(false);
    
    //recupera o username pela URL
    let urlParams = window.location.href.split("/");
    let username = urlParams[urlParams.length - 1];
    let dadosGithub = JSON.parse(localStorage.getItem(username));
            

    function usernameJaArmazenadoEmLocal() {
        return (localStorage.getItem(username) !== null);
    }

    function renderRepos(repos) {
        var tbody = document.querySelector('table tbody');
        for(var i = 0; i < repos.length; i++) {
            renderDados(repos[i]);

            //linha em branco entre os reps
            var tr_newRepo = document.createElement('tr');
            var td_newRepo = document.createElement('td');
            td_newRepo.colSpan = "2";
            td_newRepo.textContent = "";
            tr_newRepo.appendChild(td_newRepo);
            tbody.appendChild(tr_newRepo);

            //atualiza o cache com o repositório
            localStorage.setItem(repos[i].name, JSON.stringify(repos[i]));
        }
    }

    const goToUserInfo = () => {
        try {
            apiGithub
				.get("/" + username)
				.then((res) => {
                    setShowUserInfo(true);
                    setShowUserRepos(false);
                    setShowUserStarred(false);
                    setShowMsgSemUser(false);
                    renderDados(dadosGithub);
				})
				.catch(function (thrown) {
					setShowMsgSemUser(true);
					console.log(thrown);
				});
        } catch(error) {
            console.log(error);
        }
    }

    const goToUserRepos = () =>  {
        try {
            apiGithub
				.get("/" + username + "/repos")
				.then((res) => {
                    setShowUserInfo(false);
                    setShowUserRepos(true);
                    setShowUserStarred(false);
                    setShowMsgSemUser(false);
                    renderRepos(res.data)
				})
				.catch(function (thrown) {
					setShowMsgSemUser(true);
					console.log(thrown);
				});
        } catch(error) {
            console.log(error);
        }
    }

    const goToUserStarred = () => {
        console.log("Starred");
        try {
            apiGithub
				.get("/" + username + "/starred")
				.then((res) => {
                    setShowMsgSemUser(false);
                    setShowUserInfo(false);
                    setShowUserRepos(false);
                    setShowUserStarred(true);
                    renderRepos(res.data)
				})
				.catch(function (thrown) {
					setShowMsgSemUser(true);
					console.log(thrown);
				});
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(usernameJaArmazenadoEmLocal()) {
            renderDados(dadosGithub);
        } else {
            setShowMsgSemUser(true);
            setShowUserInfo(false);
            setShowUserRepos(false);
            setShowUserStarred(false);
        }
            
    }, []);

    return (
    	<>
            <Container className="pageWrapper mt-5">
                
                {showUserInfo === true ? 
                    <div className="col-md-12">
                        <table className="table table-sm table-striped table-bordered">
                            <thead className="thead">
                                <tr>
                                    <th className="text-center" scope="col" colSpan="2">Informações do user</th>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="col" colSpan="2">
                                        <Button type="button" className="btn btn-info" onClick={() => goToUserRepos()}>Repos</Button>{" "}
                                        <Button type="button" className="btn btn-info" onClick={() => goToUserStarred()}>Starred</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            
                            </tbody>
                        </table>
                    </div>
                    
            
                    :
                    
                    <Row></Row>
                    
                }

                {showUserRepos === true ? 
                    <div className="col-md-12">
                        <table className="table table-sm table-striped table-bordered">
                            <thead className="thead">
                                <tr>
                                    <th className="text-center" scope="col" colSpan="2">Repositórios do user</th>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="col" colSpan="2">
                                        <Button type="button" className="btn btn-info" onClick={() => goToUserInfo()}>Info</Button>{" "}
                                        <Button type="button" className="btn btn-info" onClick={() => goToUserStarred()}>Starred</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            
                            </tbody>
                        </table>
                    </div>
                    
            
                    :
                    
                    <Row>
					</Row>
                    
                }

                {showUserStarred === true ? 
                    <div className="col-md-12">
                        <table className="table table-sm table-striped table-bordered">
                            <thead className="thead">
                                <tr>
                                    <th className="text-center" scope="col" colSpan="2">Starred pelo user</th>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="col" colSpan="2">
                                        <Button type="button" className="btn btn-info" onClick={() => goToUserInfo()}>Info</Button>{" "}
                                        <Button type="button" className="btn btn-info" onClick={() => goToUserRepos()}>Repos</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            
                            </tbody>
                        </table>
                    </div>
                    
            
                    :
                    
                    <Row>
					</Row>
                    
                }

                {showMsgSemUser === true ?
                    <Row>
                        <Col className="alert alert-danger" role="alert">Não temos dados salvos para o usuário informado. Por favor, <Link to="/">clique aqui</Link> e tente fazer uma busca na API do Github.</Col>
                    </Row>

                    :

                    <Row>
					</Row>

                }
                
            </Container>
            
        </>
    );
  };
  
  export default UserPage;
  