export const verifyToken = () => {
    const token =  localStorage.getItem('session-token');

    if(!token) {
        this.props.history.push('/login');
    }
}