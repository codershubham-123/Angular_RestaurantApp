import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formvalue!: FormGroup
  restaurentModelObj: RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!: boolean;
  showbtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickAddResto() {
    this.formvalue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }
  //Subscribing our data which is maped via services..
  addResto() {
    this.restaurentModelObj.name = this.formvalue.value.name;
    this.restaurentModelObj.email = this.formvalue.value.email;
    this.restaurentModelObj.mobile = this.formvalue.value.mobile;
    this.restaurentModelObj.address = this.formvalue.value.address;
    this.restaurentModelObj.services = this.formvalue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Records Added Successfull.");
      this.formvalue.reset();
      this.getAllData(); // when you post any data that will change without refresh
    },
      err => {
        alert("Something is wrong in input.")
      }

    )
  }
  // Get all data
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData = res;
    })
  }
  // Delete Records
  deleteResto(data: any) {
    this.api.deleteRestaurent(data.id).subscribe(res => {
      alert("Restaurent Records Deleted.")
      this.getAllData(); // quick response without reload
    })
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurentModelObj.id = data.id
    this.formvalue.controls['name'].setValue(data.name);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['mobile'].setValue(data.mobile);
    this.formvalue.controls['address'].setValue(data.address);
    this.formvalue.controls['services'].setValue(data.services);
  }

  updateResto() {
    this.restaurentModelObj.name = this.formvalue.value.name;
    this.restaurentModelObj.email = this.formvalue.value.email;
    this.restaurentModelObj.mobile = this.formvalue.value.mobile;
    this.restaurentModelObj.address = this.formvalue.value.address;
    this.restaurentModelObj.services = this.formvalue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      alert("Restaurent Record Updated.");

      this.formvalue.reset()
      this.getAllData();// for qouick response without reload
    })
  }

}
