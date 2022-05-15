import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../base/services/user.service';
import { map, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../base/models/user.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pweb-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent implements OnInit {
  @ViewChild('fileInput') private readonly fileInput!: ElementRef<HTMLInputElement>;

  public readonly isAdminView$: Observable<boolean> = this.activatedRoute.url.pipe(
    map(segments => segments.some(segment => segment.path === 'admin'))
  );

  public readonly pictureUrl$: Observable<string | undefined> = this.userService.currentUser$.pipe(
    map(currentUser => currentUser?.picture),
  );

  public readonly accountDetailsForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required]
  });

  private newImageFile?: File;
  public newImageUrl?: SafeUrl;

  public readonly userTypeText: Record<UserType, string> = {
    [UserType.USER]: 'Regular User',
    [UserType.ADMIN]: 'Admin',
  };

  public readonly userTypes: UserType[] = Object.values(UserType);

  public readonly accountTypeControl: FormControl = new FormControl(null);

  constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    const { username, email, type } = this.userService.currentUserSnapshot!;
    this.accountDetailsForm.setValue({ username, email });

    this.accountTypeControl.valueChanges.subscribe(accountType => {
      // FIXME
    });

    this.accountTypeControl.setValue(type);
  }

  public updateAccountDetails(): void {
    // FIXME
  }

  public userVerifiedChanged(event: MatSlideToggleChange): void {
    // FIXME
  }

  public userEnabledChanged(event: MatSlideToggleChange): void {
    // FIXME
  }

  public changeImage(): void {
    this.fileInput.nativeElement.click();
  }

  public onImageAdded(): void {
    this.newImageFile = this.fileInput.nativeElement.files![0];
    this.newImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.newImageFile));
  }
}
