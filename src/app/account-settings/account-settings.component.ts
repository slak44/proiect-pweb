import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../base/services/user.service';
import { first, map, Observable, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserType } from '../base/models/user.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface FormDetails {
  username: string;
  email: string;
}

@Component({
  selector: 'pweb-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent implements OnInit {
  @ViewChild('fileInput') private readonly fileInput!: ElementRef<HTMLInputElement>;

  public readonly isAdminView$: Observable<boolean> = this.activatedRoute.url.pipe(
    map(segments => segments.some(segment => segment.path === 'admin')),
  );

  private readonly adminUserId$: Observable<number> = this.activatedRoute.params.pipe(
    map(({ userId }) => parseInt(userId as string, 10)),
  );

  public readonly targetUser$: Observable<User | null> = this.isAdminView$.pipe(
    switchMap(isAdminView =>
      isAdminView
        ? this.adminUserId$.pipe(switchMap(userId => this.userService.getUserById(userId)))
        : this.userService.currentUser$,
    ),
  );

  public readonly accountDetailsForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
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
    private readonly matSnackBar: MatSnackBar,
  ) {
  }

  public ngOnInit(): void {
    this.targetUser$.pipe(
      first((user): user is User => !!user),
    ).subscribe(({ id, username, email, type }) => {
      this.accountDetailsForm.setValue({ username, email });
      this.accountTypeControl.setValue(type);

      this.accountTypeControl.valueChanges.pipe(
        switchMap((userType: UserType) => this.userService.changeAccountType(id, userType)),
      ).subscribe(() => {
        this.matSnackBar.open(`User type changed`, undefined, { duration: 3000 });
      });
    });
  }

  public updateAccountDetails(): void {
    this.targetUser$.pipe(
      first(),
      switchMap(targetUser => {
        const { username, email } = this.accountDetailsForm.value as FormDetails;

        return this.userService.updateUserDetails(targetUser!.id, username, email, this.newImageFile);
      })
    ).subscribe();
  }

  public userVerifiedChanged(event: MatSlideToggleChange): void {
    this.targetUser$.pipe(
      first(),
      switchMap(targetUser => this.userService.updateVerifiedState(targetUser!.id, event.checked))
    ).subscribe();
  }

  public userEnabledChanged(event: MatSlideToggleChange): void {
    this.targetUser$.pipe(
      first(),
      switchMap(targetUser => this.userService.updateEnabledState(targetUser!.id, event.checked))
    ).subscribe();
  }

  public changeImage(): void {
    this.fileInput.nativeElement.click();
  }

  public onImageAdded(): void {
    this.newImageFile = this.fileInput.nativeElement.files![0];
    this.newImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.newImageFile));
  }
}
