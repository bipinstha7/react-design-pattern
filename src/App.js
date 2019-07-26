import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentels';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		return (
			<Fragment>
				<ToastContainer />
				<NavBar user={this.state.user} />
				<main className="container">
					<Switch>
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/register" component={RegisterForm} />
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route
							path="/movies"
							render={props => <Movies {...props} user={this.state.user} />}
						/>
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" to="movies" exact />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</Fragment>
		);
	}
}

export default App;
