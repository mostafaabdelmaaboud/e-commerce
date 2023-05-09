import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { AllProductsState } from '../../store/state/allProducts.state';
import { Observable, take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsModel } from '../../context/DTOs';
import { AddProduct, UpdateProduct } from '../../store/actions/allProducts.actions';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  isLoaded = false;
  @Select(AllProductsState.addProductIsLoaded) addProductIsLoaded$!: Observable<boolean>;
  selectedImage = false;
  newProductForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  fileName = '';
  private toastr = inject(ToastrService);
  public translate = inject(TranslateService);
  formValues!: any;
  closeDialog = false;
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    public matDialig: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ProductsModel
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.creatForm();
    this.addProductIsLoaded$.subscribe(res => {
      this.isLoaded = res;
    });
    if (this.data) {
      this.fileName = this.data.image;
    }
  }
  creatForm() {
    this.newProductForm = this.fb.group({
      title: [this.data?.title || "", [Validators.required, Validators.minLength(5)]],
      price: [this.data?.price || "", Validators.required],
      image: [this.data?.image || "", Validators.required],
      category: [this.data?.category || "", Validators.required],
      description: [this.data?.description || "", Validators.required],
    });
    this.formValues = this.newProductForm.value;
  }

  onNoClick(): void {
    this.closeDialog = false;
    Object.keys(this.formValues).forEach((item: string) => {
      if (this.formValues[item] != this.newProductForm.value[item]) {
        this.closeDialog = true;
      }
    });
    if (!this.closeDialog) {
      this.dialogRef.close();
    } else {
      this.matDialig.open(ConfirmationComponent, {
        width: "30vw"
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.newProductForm.get('image')?.setValue(file.name);
  }
  createProduct() {
    this.selectedImage = true;
    if (this.newProductForm.valid) {
      if (this.data) {
        this.store.dispatch(new UpdateProduct(this.newProductForm.value, this.data.id)).subscribe({
          next: res => {
            this.dialogRef.close();
            this.toastr.success("success", 'Success', {
              timeOut: 2000
            });
          }
        });
      } else {
        this.store.dispatch(new AddProduct(this.newProductForm.value)).subscribe({
          next: res => {
            this.dialogRef.close();
            this.toastr.success("success", 'Success', {
              timeOut: 2000
            });
          }
        });
      }
    }
  }

}
