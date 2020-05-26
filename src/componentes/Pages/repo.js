import React, {useState, useRef, useEffect, Fragment} from "react";
import {Form as Unform} from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import { apiGithub } from "../utils/api.js";
import { Button, Container, Col, Row, Alert, Form } from "react-bootstrap";


const UserPage = () => {
    
    let repo = JSON.parse(localStorage.getItem("ultimoRepo"));
            

    function renderRepo(repo) {
        var tbody = document.querySelector('table tbody');
        Object.entries(repo).forEach(([key, value]) => {
            var tr = document.createElement('tr');
            
            var td = document.createElement('td');
            td.textContent = key;
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);

            tbody.appendChild(tr);
        })

    }


    useEffect(() => {
        renderRepo()
    }, []);

    return (
    	<>
            <Container className="pageWrapper mt-5">
                
                <div className="col-md-12">
                    <table className="table table-sm table-striped table-bordered">
                        <thead className="thead">
                            <tr>
                                <th className="text-center" scope="col" colSpan="2">Repositório </th>
                            </tr>
                        </thead>
                        <tbody>

                        
                        </tbody>
                    </table>
                </div>

            </Container>
            
        </>
    );
  };
  
  export default UserPage;
  