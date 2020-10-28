import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISku } from 'src/app/models/sku.model';
import { selectCurrentProduct } from 'src/app/core/store/selectors/product.selector';
import { SubSink } from 'subsink';
import { EProductActions, GetCurrentProduct, GetCurrentProductSuccess, UpdateCurrentProduct, GetCurrentProductFailed } from 'src/app/core/store/actions/product.action';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { IGetCurrentProductRequest } from 'src/app/models/serverRequests/getCurrentProduct.model';
import { IProductImage } from 'src/app/models/productImage.model';
import { IconDefinition, faCircle, faPlus, faMinus, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/core/services/product.service';
import { ISizeMap } from 'src/app/models/custom/sizeMap.model';
import { AddCartItem, GetCurrentCart, GetCurrentCartSuccess, ECartActions } from 'src/app/core/store/actions/cart.action';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
	constructor(
		private router: Router,
		private titleService: Title,
		private route: ActivatedRoute,
		private store$: Store<IAppState>,
		private actions$: ActionsSubject,
		private productService: ProductService,
	) {
		this.product$ = this.store$.select(selectCurrentProduct);
	}

	// ! Ngrx definitions
	private product$: Observable<ISku>;

	private subs: SubSink = new SubSink();

	// ! General variable definitions
	private productUrl: string;
	private productType: string;
	public product: ISku;
	public sizeCount: ISizeMap;
	public sizeKeys: any;
	public sizeUnavailable: boolean;
	public selectedSize: string;
	public previewImage: IProductImage;
	public previewImageIndex: number;
	public productQuantity: number;
	public showCart: boolean;

	// ! Error definitions
	public requestError: boolean;


	// ! Load
	public loadingProduct: boolean;

	// ! Icon definitions
	public circleIcon: IconDefinition = faCircle;
	public plusIcon: IconDefinition = faPlus;
	public minusIcon: IconDefinition = faMinus;
	public chevronRightIcon: IconDefinition = faChevronRight;
	public chevronLeftIcon: IconDefinition = faChevronLeft;

	ngOnInit() {
		this.setupPage();
		this.checkCurrentProduct();
		this.getCurrentProductSuccessActionSubscription();
		this.getCurrentProductFailedActionSubscription();
	}

	private setupPage = (): void => {
		this.loadingProduct = true;
		this.productQuantity = 1;
	}

	private checkCurrentProduct = (): void => {
		this.subs.add(this.product$.subscribe((product: ISku): void => {
			this.getProductUrl();
			this.getProductType();
			if (!product) {
				this.fetchCurrentProduct();
				return;
			}
			const isSameProduct: boolean = this.productUrl === product.product_url;
			if (!isSameProduct) {
				this.fetchCurrentProduct();
				return;
			}
			this.setupProduct(product);
		}));
	}

	private setupProduct = (product: ISku): void => {
		this.product = product;
		this.titleService.setTitle(`Darkmoon - ${product.product_name}`);
		this.sizeCount = this.productService.calculateSizeCount(this.product, this.productType);
		this.sizeKeys = Object.keys;
		this.setProductPreview();
		this.loadingProduct = false;
	}

	private getProductUrl = (): void => {
		this.subs.add(this.route.params.subscribe((params: Params): void => {
			this.productUrl = params.product;
		}));
	}

	private getProductType = (): void => {
		const indexOfProductTypeInURL: number = 2;
		this.productType = this.router.url.split('/')[indexOfProductTypeInURL];
	}

	private getCurrentProductSuccessActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType<GetCurrentProductSuccess>(EProductActions.GetCurrentProductSuccess)).subscribe((action: GetCurrentProductSuccess): void => {
				this.store$.dispatch(new UpdateCurrentProduct(action.payload.body));
				this.setupProduct(action.payload.body);
			}
		));
	}

	private getCurrentProductFailedActionSubscription = (): void => {
		this.subs.add(this.actions$.pipe(
			ofType<GetCurrentProductFailed>(EProductActions.GetCurrentProductFailed)).subscribe((action: GetCurrentProductFailed): void => {
				this.requestError = true;
			}
		));
	}

	private fetchCurrentProduct = (): void => {
		const productInfo: IGetCurrentProductRequest = { productUrl: this.productUrl, productType: this.productType };
		this.store$.dispatch(new GetCurrentProduct(productInfo));
	}

	public setProductPreview = (productImage?: IProductImage, index?: number): void => {
		this.previewImage = productImage || this.product.images[0];
		this.previewImageIndex = index || 0;
	}

	public changePreviewImage = (direction: number): void => {
		let index = this.previewImageIndex + direction;
		if (index < 0) { index = this.product.images.length - 1; }
		if (index > this.product.images.length - 1) { index = 0; }
		this.previewImage = this.product.images[index];
		this.previewImageIndex = index;
	}

	public selectSize = (size: string): void => {
		if (this.sizeCount[size] === 0) {
			this.sizeUnavailable = true;
			return;
		}
		this.sizeUnavailable = false;
		this.selectedSize = size;
	}

	public incrementProductQuantity = (): void => {
		this.productQuantity = this.productQuantity + 1;
	}

	public decrementProductQuantity = (): void => {
		if (this.productQuantity === 1) { return; }
		this.productQuantity = this.productQuantity - 1;
	}

    /**
     * Adds the product to the cart with the desired quantity
     */
	public addToCart = (): void => {
		for (let i = 0; i < this.productQuantity; i++) {
			this.store$.dispatch(new AddCartItem(this.product));
		}
		this.productQuantity = 0;
		// ToDo - Change this to a beautiful message
		alert("Adicionado com sucesso")
	}

	ngOnDestroy() {
		this.subs.unsubscribe()
	}
}
