import React from 'react';

class ValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      creditCard: '',
      month: '',
      year: '',
      cvv: '',
      terms: false,
      formValidation: {
        fullName: true,
        phone: true,
        email: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zipCode: true,
        creditCard: true,
        month: true,
        year: true,
        cvv: true,
        terms: true
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.regName = /^([a-zA-Z]){2,32} ?([a-zA-Z]){0,32}$/;
    this.regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,5}$/i;
  }

  resetForm() {
    this.setState({
      fullName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      creditCard: '',
      month: '',
      year: '',
      cvv: '',
      terms: false
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const formValidation = {
      fullName: true,
      phone: true,
      email: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      zipCode: true,
      creditCard: true,
      month: true,
      year: true,
      cvv: true,
      terms: true
    };

    switch (name) {
      case 'phone':
      case 'creditCard':
      case 'zipCode':
      case 'cvv':
        if (/^[0-9]*$/.test(value)) {
          this.setState({ [name]: value });
        }
        break;
      case 'fullName':
      case 'address1':
      case 'address2':
      case 'city':
        if (value.includes('  ') === false) {
          this.setState({ [name]: value });
        }
        break;
      case 'terms':
        this.setState({ terms: !this.state.terms });
        break;
      default:
        this.setState({ [name]: value });
    }

    this.setState({ formValidation });
  }

  handleSubmit(event) {
    const { setView } = this.props;
    event.preventDefault();
    const formValidation = JSON.parse(
      JSON.stringify(this.state.formValidation)
    );

    if (
      !this.regName.test(this.state.fullName) ||
      this.state.fullName.length < 5
    ) {
      formValidation.fullName = false;
    }

    if (this.state.phone.length < 10) {
      formValidation.phone = false;
    }

    if (!this.regEmail.test(this.state.email)) {
      formValidation.email = false;
    }

    if (this.state.address1.length < 3) {
      formValidation.address1 = false;
    }

    if (this.state.city.length < 3) {
      formValidation.city = false;
    }

    if (this.state.state.length < 2) {
      formValidation.state = false;
    }

    if (this.state.zipCode.length < 5) {
      formValidation.zipCode = false;
    }

    if (this.state.creditCard.length < 16) {
      formValidation.creditCard = false;
    }

    if (this.state.month.length < 2) {
      formValidation.month = false;
    }

    if (this.state.year.length < 2) {
      formValidation.year = false;
    }

    if (this.state.cvv.length < 3) {
      formValidation.cvv = false;
    }

    if (!this.state.terms) {
      formValidation.terms = false;
    }

    if (Object.values(formValidation).includes(false) === false) {
      const order = {
        fullName: this.state.fullName.trim(),
        email: this.state.email,
        phone: this.state.phone,
        creditCard: this.state.creditCard,
        expirationDate: `${this.state.month}/${this.state.year}`,
        cvv: this.state.cvv,
        shippingAddress: `${this.state.address1.trim()} \n${
          this.state.address2
        } \n${this.state.city.trim()}, ${this.state.state} ${
          this.state.zipCode
        }`
      };
      this.props.placeOrder(order);
    } else {
      this.setState({
        fullName: this.state.fullName.trim(),
        address1: this.state.address1.trim(),
        city: this.state.city.trim(),
        formValidation: formValidation
      });
    }
    setView('confirmation', { productId: {} });
  }

  render() {
    return (
      <form
        className="p-3 border rounded bg-white needs-validation"
        id="checkout-form"
        onChange={() => this.handleChange(event)}
        onSubmit={() => this.handleSubmit(event)}
        noValidate
      >
        <div className="form-group">
          <h5>Billing/Shipping Address</h5>
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            autoComplete="new-password"
            name="fullName"
            className={`form-control ${
              this.state.formValidation.fullName ? '' : 'is-invalid'
            }`}
            onChange={() => this.handleChange(event)}
            value={this.state.fullName}
            minLength="5"
            maxLength="65"
          />
          <div className="invalid-feedback">
            {this.state.fullName.length < 5 && this.state.fullName !== '' ? (
              <small>Minimum of five characters.</small>
            ) : (
              <small>Not a valid name input.</small>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Phone</label>
            <input
              type="tel"
              autoComplete="new-password"
              name="phone"
              className={`form-control ${
                this.state.formValidation.phone ? '' : 'is-invalid'
              }`}
              onChange={() => this.handleChange(event)}
              value={this.state.phone}
              minLength="10"
              maxLength="11"
            />
            <div className="invalid-feedback">
              <small>Missing or invalid phone number.</small>
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="new-password"
              name="email"
              className={`form-control ${
                this.state.formValidation.email ? '' : 'is-invalid'
              }`}
              minLength="6"
              maxLength="254"
            />
            <div className="invalid-feedback">
              <small>Missing or invalid email address.</small>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputAddress">Address 1</label>
            <input
              type="text"
              autoComplete="new-password"
              name="address1"
              onChange={() => this.handleChange(event)}
              value={this.state.address1}
              className={`form-control ${
                this.state.formValidation.address1 ? '' : 'is-invalid'
              }`}
            />
            <div className="invalid-feedback">
              {this.state.address1.length < 3 && this.state.address1 !== '' ? (
                <small>Minimum of three characters.</small>
              ) : (
                <small>Missing or invalid street address.</small>
              )}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputAddress2">Address 2</label>
            <input
              type="text"
              autoComplete="new-password"
              name="address2"
              className={`form-control ${
                this.state.formValidation.address2 ? '' : 'is-invalid'
              }`}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              autoComplete="new-password"
              name="city"
              className={`form-control ${
                this.state.formValidation.city ? '' : 'is-invalid'
              }`}
              onChange={() => this.handleChange(event)}
              value={this.state.city}
              minLength="3"
              maxLength="50"
            />
            <div className="invalid-feedback">
              {this.state.city.length < 3 && this.state.city !== '' ? (
                <small>Minimum of three characters.</small>
              ) : (
                <small>Missing or invalid city.</small>
              )}
            </div>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputState">State</label>
            <select
              className={`form-control ${
                this.state.formValidation.state ? '' : 'is-invalid'
              }`}
              name="state"
            >
              <option defaultValue hidden></option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <div className="invalid-feedback">
              <small>Select a state.</small>
            </div>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputZip">Zip</label>
            <input
              type="tel"
              autoComplete="new-password"
              name="zipCode"
              className={`form-control ${
                this.state.formValidation.zipCode ? '' : 'is-invalid'
              }`}
              onChange={() => this.handleChange(event)}
              value={this.state.zipCode}
              minLength="5"
              maxLength="5"
            />
            <div className="invalid-feedback">
              <small>Missing or invalid zipcode.</small>
            </div>
          </div>
        </div>
        <div className="form-group">
          <h5>Payment Details</h5>
        </div>
        <div className="form-row p-3 border rounded mb-3">
          <div className="form-group col-md-6">
            <label htmlFor="creditCard">Credit Card Number</label>
            <input
              type="tel"
              autoComplete="new-password"
              name="creditCard"
              className={`form-control ${
                this.state.formValidation.creditCard ? '' : 'is-invalid'
              }`}
              minLength="16"
              maxLength="16"
              onChange={() => this.handleChange(event)}
              value={this.state.creditCard}
            />
            <div className="invalid-feedback">
              <small>Missing or invalid credit card number.</small>
            </div>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">Month</label>
            <select
              className={`form-control ${
                this.state.formValidation.month ? '' : 'is-invalid'
              }`}
              name="month"
            >
              <option defaultValue hidden></option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <div className="invalid-feedback">
              <small>Select a month.</small>
            </div>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">Year</label>
            <select
              className={`form-control ${
                this.state.formValidation.year ? '' : 'is-invalid'
              }`}
              name="year"
            >
              <option defaultValue hidden></option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            <div className="invalid-feedback">
              <small>Select a year.</small>
            </div>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">CVV</label>
            <input
              type="tel"
              autoComplete="new-password"
              name="cvv"
              className={`form-control ${
                this.state.formValidation.cvv ? '' : 'is-invalid'
              }`}
              onChange={() => this.handleChange(event)}
              value={this.state.cvv}
              minLength="3"
              maxLength="4"
            />
            <div className="invalid-feedback">
              <small>Missing or invalid CVV.</small>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className={`form-check-input ${
                this.state.formValidation.terms ? '' : 'is-invalid'
              }`}
              name="terms"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I accept that this website is for demonstration purposes, that no
              payment processing will be done, and that personal information
              such as names, addresses, or real credit card numbers should not
              be used on submission of this form.
            </label>
            <div className="invalid-feedback">
              <small>Terms are required.</small>
            </div>
          </div>
        </div>
        <button type="submit" className="btn text-white checkoutBtn">
          Process Order
        </button>
      </form>
    );
  }
}

export default ValidationForm;
