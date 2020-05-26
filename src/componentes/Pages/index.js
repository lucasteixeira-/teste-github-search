import React, { useState } from "react";
import {Form as Unform} from "@unform/web";
import { useHistory } from "react-router-dom";
import Input from "../Form/Input";
import { Button, Container, Col, Row, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiGithub } from "../utils/api.js";
import { existeEmLocalStorage, existeEmLocalStorageEEHRepo, existeEmLocalStorageEEHUser, renderDados, limparTabelaRepos } from "../utils/funcoes";


const Home = () => {
		
		let history = useHistory();
		const [showMsgErro, setShowMsgErro] = useState(false);
		const [showRepo, setShowRepo] = useState(false);
	
		function handleSubmit(data) {
			
			if(existeEmLocalStorage(data.user)) {
				if(existeEmLocalStorageEEHRepo(data.user)) {
					setShowRepo(true);
					setShowMsgErro(false);
					renderDados(JSON.parse(localStorage.getItem(data.user)));
				} else if(existeEmLocalStorageEEHUser(data.user))
					history.push("/" + data.user);
			} else {
				//se não existe no cache, tenta buscar na API
				console.log(data.user + " não existe em LS");
			
				apiGithub
					.get("/" + data.user)
					.then((res) => {
						console.log(res.data);
						if(res.data.created_at === null) {
							setShowMsgErro(true);
						} else {
							
							if(localStorage.getItem(data.user) !== null)
								console.log(data.user + " existe em LS");
							
							//armazena em localStorage os dados do usuário
							localStorage.setItem(data.user, JSON.stringify(res.data));
							history.push("/" + data.user);
						}

					})
					.catch(function (thrown) {
						setShowMsgErro(true);
						setShowRepo(false);
						limparTabelaRepos();
						console.log(thrown);
					});
			}		
		}

		return (
			<>
				<Container className="pageWrapper mt-5">
					<Unform onSubmit={handleSubmit}>
						<Row>
							<Col className="text-center">
								<h3>Busca Github</h3>  
							</Col>
						</Row>
						<Row>	
							<Col>
								<InputGroup className="mb-3">
									<Input name="user" placeholder="Digite o termo de sua busca" required/>
									<InputGroup.Append>
										<Button type="submit">Buscar</Button>
									</InputGroup.Append>
								</InputGroup>
							</Col>
						</Row>
						<Row>
						{showMsgErro ?
							<Col className="alert alert-danger" role="alert">Sua busca não obteve nenhum resultado</Col>
							:
							<Col></Col>
						}
						</Row>
						
						
						<Row>
							<div className="col-md-12">
									<table id="repoTable" className="table table-sm table-striped table-bordered">
										<thead className="thead">
											{showRepo ? 
												<tr>
													<th className="text-center" scope="col" colSpan="2">Repositório salvo</th>
												</tr> 
												:
												""	
											}
											
										</thead>
										<tbody>
			
										
										</tbody>
									</table>
								</div>
							
								
						</Row>
						
					</Unform>	
				</Container>	
			</>	
		);
	};
	
	export default Home;
	