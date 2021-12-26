<template>
	<view style="min-height: 90vh; background-image: radial-gradient(50% 50% at 50% 50%, rgba(203, 75, 244, 0.1) 0%, rgba(255, 255, 255, 0) 100%); padding-bottom: 1rem;">
		<view class="margin margin-top padding-top flex justify-between align-center">
			<view class="flex justify-center align-center">
				<image src="../static/imgs/logo.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
				<text class="ztext text-xl text-bold margin-left-sm">{{$t("name")}}</text>
			</view>
			<view class="flex justify-start align-center">
				<view class="bg-white padding-xs text-bold" style="border-radius: 20upx;">
					{{hiddenAddress(address)}}
				</view>
				<view @tap="langSwitch()" class="margin-left">
					<image src="../static/imgs/lang.png" style="width: 1.5rem; height: 1.5rem;"></image>
				</view>
			</view>
		</view>
		
		<view class="margin-left margin-right padding-left padding-right text-grey">
			<!-- <view class="margin-top-xs">{{$t("cardNotice1")}}</view> -->
			<view class="margin-top-xs">{{$t("cardNotice2")}}</view>
		</view>
		
		<view class="margin padding bg-white" style="border-radius: 20upx;">
			<view class="flex justify-around align-center">
				<view @tap="tabCur=0;" class="text-xl text-bold padding-bottom-xs" :style="tabCur == 0 ? 'color: #1c61ff; border-bottom: 5upx solid #1c61ff;' : ''">{{$t('center')}}</view>
				<view @tap="tabCur=2;" class="text-xl text-bold padding-bottom-xs" :style="tabCur == 2 ? 'color: #1c61ff; border-bottom: 5upx solid #1c61ff;' : ''">{{$t('cardRank')}}</view>
				<view @tap="tabCur=1;" class="text-xl text-bold padding-bottom-xs" :style="tabCur == 1 ? 'color: #1c61ff; border-bottom: 5upx solid #1c61ff;' : ''">{{$t('my')}}</view>
			</view>
			<view v-if="tabCur != 2" class="flex justify-between align-center margin-top-xl">
				<view class="flex justify-start align-center">
					<view class="text-grey">{{$t("choice")}}</view>
					<xfl-select
						@change=changeContract($event)
						class="margin-left-xs"
						:list="contracts"
						:clearable="false"
						:showItemNum="5" 
						:listShow="false"
						:isCanInput="false"  
						:style_Container="'height: 60upx; width: 280upx; font-size: 28upx;'"
						:placeholder = "'placeholder'"
						:initValue="contractCur"
						:selectHideType="'hideAll'"
					></xfl-select>
				</view>
			</view>
			
			<view v-if="tabCur==0" class="margin-top" v-for="(product, indexIn) in (contractsMap[contractCur]?contracts[contractsMap[contractCur].inx].nftsSell:[])" :key="'productMyIn' + indexIn">
				<view class="padding-sm flex" style="background-color: #f1f1f1; border-radius: 20upx;">
					<view class="flex justify-center">
						<image :src="'https://hld-chain.oss-cn-beijing.aliyuncs.com/nfts/0x94Aff5D4461426926bC3c282c88832bBe2DFaF8E/' + product.tokenId + '.png'" style="width: 6.5rem; height: 9rem;"></image>
					</view>
					<view class="margin-left">
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardLevel")}}</view>
							<view class="text-blue text-sm">{{product.flag}}</view>
						</view>
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardId")}}</view>
							<view class="text-blue text-xs">{{product.tokenId}}</view>
						</view>
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardTime")}}</view>
							<view class="text-blue text-sm">{{zmoment(product.timeStart).format("yyyy-MM-DD")}}</view>
						</view>
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardScene")}}</view>
							<view class="text-blue text-sm">{{$t("cardScene2")}}</view>
						</view>
						<!-- <view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardWorth32")}}</view>
							<view class="text-blue text-sm">{{(product.priceRange.first).toFixed(2)}} ~ {{(product.priceRange.second).toFixed(2)}}<span class="text-grey margin-left-xs">HLD</span></view>
						</view> -->
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("hldPrice")}}</view>
							<view class="text-red text-sm">{{product.price ? product.price.toFixed(4) : 0}}<span class="text-grey margin-left-xs">HLD</span></view>
						</view>
						<view v-if="product.isMys" @tap="confirm($t('cardCancelTitle'), $t('cardCancelContent').replace('{0}', product.flag + '-' + product.tokenId), true, function(){doCancelProduct(product)});" class="margin-top text-blue text-center" :style="'margin-left: 15%; width: 70%; padding-bottom: 10upx; font-size: 28upx; border: 1px solid #1c61ff; border-radius: 10upx;'">{{$t("cardCancel")}}</view>
						<view v-if="!product.isMys" @tap="productCurSys=product.tokenId" class="margin-top text-blue text-center" :style="'margin-left: 15%; width: 70%; padding-bottom: 10upx; font-size: 28upx; border: 1px solid #1c61ff; border-radius: 10upx;'">{{$t("cardBuy")}}</view>
										
						<view v-if="productCurSys" class="cu-modal" :class="productCurSys==product.tokenId?'show':''">
							<view class="cu-dialog">
								<view class="cu-bar justify-end">
									<view class="content text-bold">{{$t("cardSell") + " " + product.flag + "-" + product.tokenId}}</view>
									<view class="action" @tap="productCurSys=''">
										<image src="../static/imgs/close.png" style="width: 1rem; height: 1rem;"></image>
									</view>
								</view>
								<view class="padding-sm text-left radius padding">
									<view class="flex justify-center">
										<image :src="'https://hld-chain.oss-cn-beijing.aliyuncs.com/nfts/0x94Aff5D4461426926bC3c282c88832bBe2DFaF8E/' + product.tokenId + '.png'" style="border-radius: 40upx; width: 16rem; height: 22rem;"></image>
									</view>
									<!-- <view class="flex justify-between align-center margin-top">
										<view class="flex justify-start align-center">
											<image :src="'../static/imgs/logo.png'" style="width: 1.5rem; height: 1.5rem;"></image>
											<view class="margin-left-xs">{{$t("cardWorth32")}}</view>
										</view>
										<view class="text-blue">{{(product.priceRange.first).toFixed(2)}} ~ {{(product.priceRange.second).toFixed(2)}}<span class="text-grey margin-left-xs"> HLD</span></view>
									</view> -->
									<view class="flex justify-between align-center margin-top-xl">
										<view class="flex justify-start align-center">
											<image :src="'../static/imgs/coins/HLD.png'" style="width: 1.5rem; height: 1.5rem;"></image>
											<view class="margin-left-xs">{{$t("hldCan")}}</view>
										</view>
										<view class="text-blue">{{cntHld}}<span class="text-grey margin-left-xs"> HLD</span></view>
									</view>
									<view class="flex justify-between align-center margin-top">
										<view class="flex flex-sub justify-start align-center">
											<image :src="'../static/imgs/coins/HLD.png'" style="width: 1.5rem; height: 1.5rem;"></image>
											<view class="margin-left-xs">{{$t("cardPrice2")}}</view>
										</view>
										<view class="text-blue">{{product.price}}<span class="text-grey margin-left-xs"> HLD</span></view>
									</view>
									<button @tap="doBuyProduct(product)" class="margin-top-xl bg-blue" style="width: 80%; border-radius: 20upx;">{{$t("cardBuy")}}</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="tabCur == 1" class="margin-top" v-for="(product, indexIn) in (contractsMap[contractCur]?joMys[contractsMap[contractCur].contract]:[])" :key="'productMyIn' + indexIn">
				<view class="padding-sm flex" style="background-color: #f1f1f1; border-radius: 20upx;">
					<view class="flex justify-center">
						<image :src="'https://hld-chain.oss-cn-beijing.aliyuncs.com/nfts/0x94Aff5D4461426926bC3c282c88832bBe2DFaF8E/' + product.tokenId + '.png'" style="width: 6.5rem; height: 9rem;"></image>
					</view>
					<view class="margin-left">
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardLevel")}}</view>
							<view class="text-blue text-sm">{{product.flag}}</view>
						</view>
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardId")}}</view>
							<view class="text-blue text-xs">{{product.tokenId}}</view>
						</view>
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardTime")}}</view>
							<view class="text-blue text-sm">{{zmoment(product.timeStart).format("yyyy-MM-DD")}}</view>
						</view>
						<!-- <view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardWorth32")}}</view>
							<view class="text-red text-sm">{{(product.priceRange.first).toFixed(2)}} ~ {{(product.priceRange.second).toFixed(2)}} <span class="text-grey margin-left-xs">HLD</span></view>
						</view> -->
						<view class="flex justify-between align-center margin-top-xs">
							<view>{{$t("cardScene")}}</view>
							<view class="text-blue text-sm">{{$t("cardScene2")}}</view>
						</view>
						
						<view @tap="doHnftApprove(product);" class="margin-top text-blue text-center" :style="'margin-left: 15%; width: 70%; padding-bottom: 10upx; font-size: 28upx; border: 1px solid #1c61ff; border-radius: 10upx;'">{{$t("cardSell")}}</view>
										
						<view v-if="productCurMy" class="cu-modal" :class="productCurMy==product.tokenId?'show':''">
							<view class="cu-dialog">
								<view class="cu-bar justify-end">
									<view class="content text-bold">{{$t("cardSell") + " " + product.flag + "-" + product.tokenId}}</view>
									<view class="action" @tap="productCurMy=''">
										<image src="../static/imgs/close.png" style="width: 1rem; height: 1rem;"></image>
									</view>
								</view>
								<view class="padding-sm text-left radius padding">
									<view class="flex justify-center">
										<image :src="'https://hld-chain.oss-cn-beijing.aliyuncs.com/nfts/0x94Aff5D4461426926bC3c282c88832bBe2DFaF8E/' + product.tokenId + '.png'" style="border-radius: 40upx; width: 16rem; height: 22rem;"></image>
									</view>
									<view class="flex justify-between align-center margin-top-xl">
										<view class="flex justify-start align-center">
											<image :src="'../static/imgs/coins/HLD.png'" style="width: 1.5rem; height: 1.5rem;"></image>
											<view class="margin-left-xs">{{$t("hldCan")}}</view>
										</view>
										<view class="text-blue">{{cntHld}}<span class="text-grey margin-left-xs"> HLD</span></view>
									</view>
									<!-- <view class="flex justify-between align-center margin-top">
										<view class="flex justify-start align-center">
											<image :src="'../static/imgs/logo.png'" style="width: 1.5rem; height: 1.5rem;"></image>
											<view class="margin-left-xs">{{$t("cardWorth32")}}</view>
										</view>
										<view class="text-blue">{{(product.priceRange.first).toFixed(2)}} ~ {{(product.priceRange.second).toFixed(2)}}<span class="text-grey margin-left-xs"> HLD</span></view>
									</view> -->
									<view class="flex justify-between align-center margin-top">
										<view class="flex flex-sub justify-start align-center">
											<image :src="'../static/imgs/coins/HLD.png'" style="width: 1.5rem; height: 1.5rem;"></image>
											<view class="margin-left-xs">{{$t("hldPrice")}}</view>
										</view>
										<view class="flex flex-twice justify-end align-center">
											<input class="text-center padding-xs text-blue" style="width: 65%; height: 60upx; border: 1px solid #1c61ff; border-radius: 20upx;"
												 v-model="sellPrice" :placeholder="$t('hldPrice2')" name="input"></input>
											<view class="margin-left-xs text-grey">HLD</view>
										</view>
									</view>
									<button @tap="doSellProduct(product)" class="margin-top-xl bg-blue" style="width: 80%; border-radius: 20upx;">{{$t("cardConfirm")}}</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<view v-if="tabCur == 2" style="margin-left: -4%; margin-top: 1rem;">
				<view class="top_bg">
					<view class="one_box">
						<!-- 第二名 -->
						<view class="top3">
							<view class="num_two" style="color: #0bb3c2;">
								<image class="huangguan2" src="../static/rank/two.png"></image>
								<image class="top3_head" :src="rankList[1].headimgurl"></image>
								<view class="top_name">{{rankList[1].salary}}<span class="margin-left-xs"> HLD</span></view>
								<view class="top_sy">{{rankList[1].name}}<span>｜</span>{{hiddenAddress(rankList[1].city)}}</view>
							</view>
						</view>
		
						<!-- 第一名 -->
						<view class="top3">
							<view class="num_one text-bold" style="color: #fac537;">
								<image class="huangguan1" src="../static/rank/one.png"></image>
								<image class="top3_head" :src="rankList[0].headimgurl"></image>
								<view class="top_name">{{rankList[0].salary}}<span class="margin-left-xs"> HLD</span></view>
								<view class="top_sy">{{rankList[0].name}}<span>｜</span>{{hiddenAddress(rankList[0].city)}}</view>
							</view>
						</view>
		
						<!-- 第三名 -->
						<view class="top3">
							<view class="num_three" style="color: #c38875;">
								<image class="huangguan2" src="../static/rank/three.png"></image>
								<image class="top3_head" :src="rankList[2].headimgurl"></image>
								<view class="top_name">{{rankList[2].salary}}<span class="margin-left-xs"> HLD</span></view>
								<view class="top_sy">{{rankList[2].name}}<span>｜</span>{{hiddenAddress(rankList[2].city)}}</view>
							</view>
						</view>
					</view>
				</view>
		
				<view class="rankList_box">
					<view v-if="index > 2" class="rankItem" v-for="(item, index) in rankList" :key="index">
						<view class="rankIndex">
							<text>{{ index + 1 }}</text>
						</view>
						<view class="HeardBox">
							<image class="rankHeard" :src="rankList[index].headimgurl"></image>
						</view>
		
						<view class="NameBox">
							<view class="userName text-bold">{{rankList[index].salary}}<span class="margin-left-xs"> HLD</span></view>
							<view class="userPost text-gray"></view>
							<view class="color_ccc">{{rankList[index].name}}<span class="margin-left-xs margin-right-xs text-grey">｜</span>{{hiddenAddress(rankList[index].city)}}</view>
						</view>
						<view class="download_box">
							<image mode="widthFix" src="../static/rank/kline.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import xflSelect from '../components/xfl-select/xfl-select.vue';
	
	var _this;
	var web3;
	var web3Provider;
	var hnftContract;
	var nftexContract;
	
	export default {
		data() {
			return {
				address: "",
				contracts: [{"img":"HNFT.png","middle":"0xc1dc281e35b40179d8f134bb9fb683fa19a00a6b","nfts":[{"flag":"M","address":"","tokenId":80000,"price":0,"priceRange":{"first":243.13842596456,"second":542.5681595103069}},{"flag":"G","address":"","tokenId":140000,"price":0,"priceRange":{"first":42.549224543798005,"second":94.94942791430371}},{"flag":"F","address":"","tokenId":150000,"price":0,"priceRange":{"first":36.470763894684,"second":81.38522392654603}},{"flag":"E","address":"","tokenId":160000,"price":0,"priceRange":{"first":30.39230324557,"second":67.82101993878837}},{"flag":"E","address":"","tokenId":160001,"price":0,"priceRange":{"first":30.39230324557,"second":67.82101993878837}},{"flag":"E","address":"","tokenId":160002,"price":0,"priceRange":{"first":30.39230324557,"second":67.82101993878837}},{"flag":"D","address":"","tokenId":170000,"price":0,"priceRange":{"first":24.313842596456002,"second":54.25681595103069}},{"flag":"D","address":"","tokenId":170001,"price":0,"priceRange":{"first":24.313842596456002,"second":54.25681595103069}},{"flag":"D","address":"","tokenId":170002,"price":0,"priceRange":{"first":24.313842596456002,"second":54.25681595103069}},{"flag":"D","address":"","tokenId":170003,"price":0,"priceRange":{"first":24.313842596456002,"second":54.25681595103069}},{"flag":"C","address":"","tokenId":180000,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180001,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180002,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180003,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180004,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180005,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180007,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180008,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180009,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180010,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180011,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180012,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180013,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"C","address":"","tokenId":180014,"price":0,"priceRange":{"first":6.0784606491140005,"second":13.564203987757672}},{"flag":"B","address":"","tokenId":190000,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190001,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190002,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190003,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190004,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190005,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190006,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190007,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190008,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190009,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190010,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190011,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190012,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190013,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190014,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190015,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190016,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190017,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190018,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190019,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190020,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190021,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190022,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190023,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190024,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190025,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}},{"flag":"B","address":"","tokenId":190026,"price":0,"priceRange":{"first":3.0392303245570003,"second":6.782101993878836}}],"contract":"0x94aff5d4461426926bc3c282c88832bbe2dfaf8e","name":"Happy Nft","value":"HNFT"}], // this.storage("contracts") ? JSON.parse(this.storage("contracts")) : 
				contractCur: 'HNFT',
				contractsMap: {},
				joMys: {}, // this.storage("joMys") ? JSON.parse(this.storage("joMys")) : 
				tabCur: 0,
				cntHld: 0,
				productCurMy: "",
				viewCur: "",
				sellPrice: "",
				productCurSys: "",
				nftexAddress: "0xf4a37Ca9a9f47b0B947a614D641936dA4E68bED0",
				
				rankListAll: [],
				rankList: [], // this.storage("contracts") ? JSON.parse(this.storage("contracts")) : 
			};
		},
		components: {
			xflSelect,
		},
		onLoad(option) {
			if (option.other && option.other.indexOf('0x') == 0) {
				this.address = option.other;
			}
		},
		mounted() {
			_this = this;
			_this.initData();
		},
		methods: {
			initData() {
				let Web3 = require('web3');
				if (window.ethereum) {
					web3Provider = window.ethereum;
					try {
						window.ethereum.enable();
					} catch (error) {
						console.error("User denied account access")
					}
				}
				web3 = new Web3(web3Provider);
				web3.eth.getAccounts(function(error, result) {
					if (!error) {
						if (!_this.address || !_this.address.indexOf('0x') == 0) {
							_this.address = result[0];
						}
						
						uni.request({
							url: _this.baseServer + "nft/infos?address=" + _this.address,
							method: 'GET',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							data: {},
							success: (res) => {
								if (res.data.code == 10000) {
									_this.contracts = res.data.data.contracts;
									for (let i = 0; i < _this.contracts.length; i++) {
										var tmp = _this.contracts[i];
										tmp.inx = i;
										_this.contractsMap[tmp.value] = tmp;
									}
									_this.doChangeContract();
									console.log(res.data);
								}
							}
						});
						
						web3.eth.getBalance(_this.address).then(function(result){
							_this.cntHld = _this.formatCntDecimal(result / 1000000000000000000, 4);
						});
						
						var nftexContractAbi = [{"inputs":[{"internalType":"uint16","name":"_feePercent","type":"uint16"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC721","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":false,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"bidPrice","type":"uint256"}],"name":"Bid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC721","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":false,"internalType":"address","name":"seller","type":"address"}],"name":"CancelOrder","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC721","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"address","name":"taker","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC721","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":false,"internalType":"address","name":"seller","type":"address"}],"name":"MakeOrder","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_order","type":"bytes32"}],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_order","type":"bytes32"}],"name":"buyItNow","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_order","type":"bytes32"}],"name":"cancelOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_order","type":"bytes32"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_token","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_startPrice","type":"uint256"},{"internalType":"uint256","name":"_endPrice","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"dutchAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_token","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_startPrice","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"englishAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feePercent","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_token","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"fixedPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_order","type":"bytes32"}],"name":"getCurrentPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"orderIdBySeller","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"orderIdByToken","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"orderInfo","outputs":[{"internalType":"uint8","name":"orderType","type":"uint8"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"contract IERC721","name":"token","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"startPrice","type":"uint256"},{"internalType":"uint256","name":"endPrice","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"lastBidPrice","type":"uint256"},{"internalType":"address","name":"lastBidder","type":"address"},{"internalType":"bool","name":"isSold","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_seller","type":"address"}],"name":"sellerOrderLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_token","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenOrderLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_percent","type":"uint16"}],"name":"updateFeePercent","outputs":[],"stateMutability":"nonpayable","type":"function"}];
						nftexContract = new web3.eth.Contract(nftexContractAbi, _this.nftexAddress, {});
						
						var hnftContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
						hnftContract = new web3.eth.Contract(hnftContractAbi, "0x94aff5d4461426926bc3c282c88832bbe2dfaf8e", {});
						
						console.log("connect: " + _this.address);
					} else {
						console.log(error);
					}
				});
			},
			changeContract(e) {
				_this.contractCur = e.orignItem.value;
				_this.doChangeContract();
			},
			doChangeContract() {
				web3.eth.getBlockNumber().then(function(resultParent){
					var contractTmp = _this.contracts[_this.contractsMap[_this.contractCur].inx].contract;
					if (contractTmp == "0x94aff5d4461426926bc3c282c88832bbe2dfaf8e") {
						for (let i = 0; i < _this.contracts[_this.contractsMap[_this.contractCur].inx].nfts.length; i++) {
							nftexContract.methods.tokenOrderLength(contractTmp, parseInt(_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].tokenId)).call({}, function(error, result) {
								if (!error) {
									if (result > 0) {
										_this.contracts[_this.contractsMap[_this.contractCur].inx].nftsSell = [];
										nftexContract.methods.orderIdByToken(contractTmp, parseInt(_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].tokenId), parseInt(result - 1)).call({}, function(err, res) {
											if (!err) {
												nftexContract.methods.orderInfo(res).call({}, function(errIn, resIn) {
													if (!errIn) {
														//  && resIn.endBlock > resultParent
														if (!resIn.isSold && resIn.endBlock > 0) {
															if (_this.address.toLowerCase() == resIn.seller.toLowerCase()) {
																_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].isMys = true;
															}
															_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].orderId = res;
															_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].price = parseFloat(resIn.startPrice / 1000000000000000000);
															_this.contracts[_this.contractsMap[_this.contractCur].inx].nftsSell[_this.contracts[_this.contractsMap[_this.contractCur].inx].nftsSell.length] = _this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i];
															_this.storage("contracts", JSON.stringify(_this.contracts));
															_this.$forceUpdate();
															console.log("sellNft: " + resIn.tokenId + "#" + res);
														}
														
														// console.log(resIn);
													} else {
														// console.log(errIn);
													}
												});
												
												// console.log(res);
											} else {
												// console.log(err);
											}
										});
										for(var j = 0; j < result; j++) {
											nftexContract.methods.orderIdByToken(contractTmp, parseInt(_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].tokenId), j).call({}, function(err, res) {
												if (!err) {
													nftexContract.methods.orderInfo(res).call({}, function(errIn, resIn) {
														if (!errIn) {
															//  && resIn.endBlock > resultParent
															if (resIn.isSold) {
																// if (!_this.nftPrices[resIn.token]) {
																// 	_this.nftPrices[resIn.token] = [];
																// }
																// _this.nftPrices[resIn.token][_this.nftPrices[resIn.token].length] = parseFloat(resIn.startPrice / 1000000000000000000);
																_this.rankListAll[_this.rankListAll.length] = {
																	headimgurl: 'https://hld-chain.oss-cn-beijing.aliyuncs.com/nfts/0x94Aff5D4461426926bC3c282c88832bBe2DFaF8E/' + resIn.tokenId + '.png',
																	name: resIn.tokenId,
																	post: [],
																	city: resIn.seller,
																	salary: parseFloat(resIn.startPrice / 1000000000000000000).toFixed(2) 
																};
																_this.doRankListSort();
																_this.storage("rankList", JSON.stringify(_this.rankList));
																_this.$forceUpdate();
																console.log("priceNft: " + resIn.tokenId + "#" + res);
															}
															
															// console.log(resIn);
														} else {
															// console.log(errIn);
														}
													});
													
													// console.log(res);
												} else {
													// console.log(err);
												}
											});
										}
									}
									
									// console.log(result);
								} else {
									// console.log(error);
								}
							});
						}
						
						hnftContract.methods.balanceOf(_this.address).call({}, function(error, result) {
							if (!error) {
								if (result > 0) {
									_this.joMys[contractTmp] = [];
									for (let i = 0; i < _this.contracts[_this.contractsMap[_this.contractCur].inx].nfts.length; i++) {
										var nftTmp = _this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i];
										hnftContract.methods.ownerOf(nftTmp.tokenId).call({}, function(errorIn, resultIn) {
											if (!errorIn) {
												if (resultIn.toLowerCase() == _this.address.toLowerCase()) {
													_this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i].contract = contractTmp; // TODO 是否优化
													_this.joMys[contractTmp][_this.joMys[contractTmp].length] = _this.contracts[_this.contractsMap[_this.contractCur].inx].nfts[i];
													_this.storage("joMys", JSON.stringify(_this.joMys));
													_this.$forceUpdate();
													console.log("myNft: " + nftTmp.tokenId + "#" + resultIn);
												}
												
												// console.log(resultIn)
											} else {
												// console.log(errorIn);
											}
										});
									}
								}
								
								// console.log(result)
							} else {
								// console.log(error);
							}
						});
					}
					// console.log(result);
				});
			},
			doHnftApprove(product) {
				hnftContract.methods.getApproved(product.tokenId).call({}, function(error, result) {
					if (!error) {
						if (result.toLowerCase() == _this.nftexAddress.toLowerCase()) {
							_this.productCurMy = product.tokenId;
							console.log(product.tokenId + ": " + result);
						} else {
							var message = {
								from: _this.address,
								gasLimit: '200000',
								gasPrice: web3.utils.toWei('36.60', 'gwei'),
								value: '0x',
							};
							hnftContract.methods.approve(_this.nftexAddress, parseInt(product.tokenId)).send(message, function(err, res) {
								if (!err) {
									_this.toast(_this.$t("cardApprove"));
									setTimeout(function() {
										_this.initData();
									}, _this.execRespDelay * 7.5);
									console.log(res);
								} else {
									console.log(err);
								}
							});
						}
						console.log(result)
					} else {
						console.log(error);
					}
				});
			},
			doSellProduct(product) {
				// if (!_this.sellPrice || parseFloat(_this.sellPrice) < parseFloat(product.priceRange.first / 20 )|| parseFloat(_this.sellPrice) > parseFloat(product.priceRange.second * 20)) {
				// 	_this.toast(_this.$t("priceMin").replace("{0}", (product.priceRange.first / 20).toFixed(4)).replace("{1}", (product.priceRange.second * 20).toFixed(4)));
				// 	return false;
				// }
				if (_this.cntHld < 0.02) {
					_this.toast(_this.$t("feeMin").replace("{0}", "0.02"));
					return false;
				}
				
				var message = {
					from: _this.address,
					gasLimit: '3000000',
					gasPrice: web3.utils.toWei('36.60', 'gwei'),
					value: '0x',
				};
				web3.eth.getBlockNumber().then(function(result){
					nftexContract.methods.fixedPrice(product.contract, parseInt(product.tokenId), web3.utils.toWei(_this.sellPrice, 'ether'), parseInt(result + 3 * 24 * 3600 / 2.25)).send(message, function(err, res) {
						if (!err) {
							_this.productCurMy = '';
							_this.toast(_this.$t("cardSell55"));
							setTimeout(function() {
								_this.initData();
							}, _this.execRespDelay * 7.5);
							// console.log(res);
						} else {
							// console.log(err);
						}
					});
					// console.log(result);
				});
			},
			doCancelProduct(product) {
				if (_this.cntHld < 0.02) {
					_this.toast(_this.$t("feeMin").replace("{0}", "0.02"));
					return false;
				}
				
				var message = {
					from: _this.address,
					gasLimit: '200000',
					gasPrice: web3.utils.toWei('36.60', 'gwei'),
					value: '0x',
				};
				nftexContract.methods.cancelOrder(product.orderId).send(message, function(err, res) {
					if (!err) {
						_this.toast(_this.$t("cardCancelSuccess"));
						setTimeout(function() {
							_this.initData();
						}, _this.execRespDelay * 7.5);
						console.log(res);
					} else {
						console.log(err);
					}
				});
			},
			doBuyProduct(product) {
				if (_this.cntHld < parseFloat(product.price + 0.02)) {
					_this.toast(_this.$t("walletNone"));
					return false;
				}
				
				var message = {
					from: _this.address,
					gasLimit: '200000',
					gasPrice: web3.utils.toWei('36.60', 'gwei'),
					value: web3.utils.toWei(parseFloat(product.price) + '', 'ether'),
				};
				nftexContract.methods.buyItNow(product.orderId).send(message, function(err, res) {
					if (!err) {
						_this.productCurSys='';
						_this.toast(_this.$t("cardBuy77"));
						setTimeout(function() {
							_this.initData();
						}, _this.execRespDelay * 7.5);
						// console.log(res);
					} else {
						// console.log(err);
					}
				});
			},
			doRankListSort() {
				// headimgurl: 'https://hld-chain.oss-cn-beijing.aliyuncs.com/nfts/0x94Aff5D4461426926bC3c282c88832bBe2DFaF8E/' + resIn.tokenId + '.png',
				// name: resIn.tokenId,
				// post: [],
				// city: resIn.seller,
				// salary: parseFloat(resIn.startPrice / 1000000000000000000).toFixed(2) 
				var tmpMap = {};
				for (let inx0 in _this.rankListAll) {
					var var1 = _this.rankListAll[inx0];
					if (!tmpMap[var1.name]) {
						tmpMap[var1.name] = {
							headimgurl: var1.headimgurl,
							name: var1.name,
							post: var1,
							city: var1.city,
							salary: var1.salary,
							all: [var1],
						};
					} else {
						if (var1.salary > tmpMap[var1.name].salary) {
							tmpMap[var1.name].salary = var1.salary;
							tmpMap[var1.name].city = var1.city;
							tmpMap[var1.name].post = var1.post;
						}
						tmpMap[var1.name].all[tmpMap[var1.name].all.length] = var1;
					}
				}
				var tmpList = [];
				var k = 0;
				for (let var2 in tmpMap) {
					tmpList[k++] = tmpMap[var2];
				}
				tmpList.sort(function(a, b){
					return b.salary - a.salary;
				});
				_this.rankList = tmpList;
			},
		}
	}
</script>

<style lang="scss">
	.top_bg {
		// width: 650rpx;
		height: 400rpx;
		// background: url(http://cdn.zhoukaiwen.com/rank_bg.png) no-repeat;
		// background-size: 650rpx;
		position: relative;
	}

	.one_box {
		width: 675rpx;
		height: 260rpx;
		position: absolute;
		left: 0;
		bottom: 110rpx;
		display: flex;
		justify-content: space-around;
	}

	.one_box .top3 {
		width: 210rpx;
		height: 280rpx;
	}

	.top_name {
		width: 100%;
		height: 55rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		text-align: center;
		overflow: hidden;
		// text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_sy {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top_sy span {
		font-size: 20rpx !important;
	}

	.num_one {
		position: relative;
	}

	.huangguan1 {
		width: 60px;
		height: 60px;
		position: absolute;
		right: -10rpx;
		top: -18*2rpx;
	}

	.num_one .top3_head {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
		margin: 15rpx 0 0 30rpx;
		border: 4rpx solid #ffdd3c;
	}

	.num_two {
		position: relative;
	}

	.huangguan2 {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 15rpx;
	}

	.num_two .top3_head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin: 45rpx 0 0 45rpx;
		border: 4rpx solid #bcdcdf;
	}

	.num_three {
		position: relative;
	}

	.huangguan2 {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 15rpx;
	}

	.num_three .top3_head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		margin: 45rpx 0 0 45rpx;
		border: 4rpx solid #e29d85;
	}

	.number_sy_main {
		width: 100%;
		height: 124rpx;
		padding-top: 20rpx;
		line-height: 52rpx;
		display: flex;
		justify-content: space-around;
		position: relative;
	}

	.xiaoding_bg {
		position: absolute;
		right: -22rpx;
		bottom: -30rpx;
		width: 180rpx;
	}

	.number_num1 {
		font-size: 40rpx;
		font-weight: 500;
		color: #2fc04f;
	}

	.number_num2 {
		font-size: 40rpx;
		font-weight: 500;
		color: #4bac7f;
	}

	.danwei {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #c9c9c9;
	}

	.rankList_box {
		width: 675rpx;
		min-height: 200rpx;
		margin-top: -80rpx;
	}

	.rankItem {
		width: 675rpx;
		height: 140rpx;
		margin: 0px auto;
		border-top: 1px solid #e9e9e9;
	}

	.rankIndex {
		width: 60rpx;
		height: 140rpx;
		line-height: 140rpx;
		text-align: center;
		color: #CCCCCC;
		font-size: 40rpx;
		float: left;
	}

	.HeardBox {
		width: 100rpx;
		height: 100rpx;
		margin: 20rpx;
		border-radius: 100%;
		overflow: hidden;
		float: left;
		margin-right: 25rpx;
		margin-left: 10rpx !important;
	}

	.HeardBox image {
		width: 100%;
		height: 100%;
	}

	.NameBox {
		width: 400rpx;
		height: 140rpx;
		float: left;
		padding-top: 10rpx;
		box-sizing: border-box;
	}

	.NameBox view {
		height: 50rpx;
		line-height: 70rpx;
	}

	.userName {
		min-width: 90rpx;
		font-size: 30rpx;
		float: left;
		margin-right: 20rpx;
	}

	.download_box {
		width: 80rpx;
		height: 140rpx;
		float: right;

	}

	.download_box image {
		width: 65rpx;
		margin: 25rpx auto;
		display: block;
	}
</style>