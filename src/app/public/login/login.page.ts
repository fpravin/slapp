import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import { UserInterface, LoginReturnInterface, LoginDataInterface } from "../../interfaces";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("kewin@gmail.com", Validators.required),
      password: new FormControl("123456", Validators.required)
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    const user: LoginDataInterface = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authenticationService.login(user);
    }
  }
}
