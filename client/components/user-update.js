import React, {Component} from 'react'
import UserForm from './user-form'
import {connect} from 'react-redux'
import {updateSingleUser, fetchSingleUser} from '../store/single-user'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export class UserUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const id = Number(this.props.match.params.id)
    await this.props.fetchSingleUser(id)

    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber
    } = this.props.user
    this.setState({
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const id = Number(this.props.match.params.id)
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber
    } = this.state
    const formData = {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber
    }
    this.props.updateSingleUser(id, formData)
  }

  render() {
    const {user} = this.props
    const {id, firstName, lastName, email, address, phoneNumber} = user
    console.log(user)
    return (
      <div className="new-product-form">
        {!!id && (
          <Card style={{width: '50rem'}}>
            <Container>
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Title>
                      {firstName} {lastName}
                    </Card.Title>
                    <Card.Subtitle>{email}</Card.Subtitle>
                    <Card.Text>{address}</Card.Text>
                    <Card.Text>{phoneNumber}</Card.Text>
                    <Row />
                  </Card.Body>
                </Col>
              </Row>
            </Container>
            <Card.Body>
              <UserForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                {...this.state}
              />
            </Card.Body>
          </Card>
        )}
      </div>
    )
  }
}

const mapState = ({user}) => ({user})
const mapDispatch = {updateSingleUser, fetchSingleUser}

export default connect(mapState, mapDispatch)(UserUpdate)
