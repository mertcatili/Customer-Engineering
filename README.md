## Description

Customer Engineering Project

## Problem

We would like to understand your problem analyzing and solving skills. There is no a single answer
and solution. So try to put your own style and understanding on your solution.
You might choose and implement which ever library, SDK, etc you want. Please be careful to use
SOLID principles and put down a clean code on your solution.

## Installation

```bash
$ npm run docker:build
```

## Running the app

```bash
$ npm run docker:build
```

## Api solution

Owners send a request to the auth/register endpoint and then log in. The register and login endpoints are public paths. 
In the login response, they receive a token which should be added to the header, and this token must be present in the header for all subsequent requests. 
Next, they send a request to the brand/create endpoint to create a brand. After creating the brand, they send a request to the auth/addEmployee endpoint. 
If they send a request to this endpoint without creating a brand first, they will receive an error. 
They send the password received in the addEmployee response to the employee. After creating a brand, they can create a branch using the branch/create endpoint and update it using the branch/update endpoint. 
Both owners and employees can see all branches by sending a request to the branch/list endpoint.