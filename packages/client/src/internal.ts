import {
  type IIdentityAddRequest,
  type IIdentityGetLoginOptionsRequest,
  type IIdentityGetLoginOptionsResponse,
  type IIdentityLoginRequest,
  type IShowICRC1TransferConfirmRequest,
  type IStatistics,
  SNAP_METHODS,
  type TIdentityId,
  type TOrigin,
  IStateGetAllOriginDataResponse,
  IIdentityEditPseudonymRequest,
  IMask,
  IIdentityStopSessionRequest,
  IIdentityUnlinkOneRequest,
  IIdentityUnlinkAllRequest,
  IStateGetAllAssetDataResponse,
  IAssetData,
  IICRC1AddAssetRequest,
  IICRC1AddAssetAccountRequest,
  IICRC1EditAssetAccountRequest,
} from "@fort-major/masquerade-shared";
import { MasqueradeClient } from "./client";

export interface IInternalSnapClientParams {
  snapId?: string | undefined;
  snapVersion?: string | undefined;
  shouldBeFlask?: boolean | undefined;
  debug?: boolean | undefined;
}

export class InternalSnapClient {
  static async create(params?: IInternalSnapClientParams): Promise<InternalSnapClient> {
    const inner = await MasqueradeClient.create(params);

    return new InternalSnapClient(inner);
  }

  getInner(): MasqueradeClient {
    return this.inner;
  }

  async register(toOrigin: TOrigin): Promise<IMask | null> {
    const body: IIdentityAddRequest = { toOrigin };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.add, body);
  }

  async login(
    toOrigin: TOrigin,
    withIdentityId: TIdentityId,
    withDeriviationOrigin: TOrigin = toOrigin,
  ): Promise<true> {
    const body: IIdentityLoginRequest = {
      toOrigin,
      withLinkedOrigin: withDeriviationOrigin,
      withIdentityId,
    };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.login, body);
  }

  async getLoginOptions(forOrigin: TOrigin): Promise<IIdentityGetLoginOptionsResponse> {
    const body: IIdentityGetLoginOptionsRequest = {
      forOrigin,
    };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.getLoginOptions, body);
  }

  async getAllOriginData(): Promise<IStateGetAllOriginDataResponse> {
    return await this.inner._requestSnap(SNAP_METHODS.protected.state.getAllOriginData);
  }

  async getAllAssetData(): Promise<IStateGetAllAssetDataResponse> {
    return await this.inner._requestSnap(SNAP_METHODS.protected.state.getAllAssetData);
  }

  async addAsset(assetId: string): Promise<IAssetData> {
    const body: IICRC1AddAssetRequest = { assetId };

    return await this.inner._requestSnap(SNAP_METHODS.protected.icrc1.addAsset, body);
  }

  async addAssetAccount(assetId: string): Promise<string> {
    const body: IICRC1AddAssetAccountRequest = { assetId };

    return await this.inner._requestSnap(SNAP_METHODS.protected.icrc1.addAssetAccount, body);
  }

  async editAssetAccount(assetId: string, accountId: number, newName: string): Promise<void> {
    const body: IICRC1EditAssetAccountRequest = { assetId, accountId, newName };

    return await this.inner._requestSnap(SNAP_METHODS.protected.icrc1.editAssetAccount, body);
  }

  async editPseudonym(origin: TOrigin, identityId: TIdentityId, newPseudonym: string): Promise<void> {
    const body: IIdentityEditPseudonymRequest = {
      origin,
      identityId,
      newPseudonym,
    };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.editPseudonym, body);
  }

  async stopSession(origin: TOrigin): Promise<boolean> {
    const body: IIdentityStopSessionRequest = {
      origin,
    };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.stopSession, body);
  }

  async unlinkOne(origin: TOrigin, withOrigin: TOrigin): Promise<boolean> {
    const body: IIdentityUnlinkOneRequest = {
      origin,
      withOrigin,
    };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.unlinkOne, body);
  }

  async unlinkAll(origin: TOrigin): Promise<boolean> {
    const body: IIdentityUnlinkAllRequest = {
      origin,
    };

    return await this.inner._requestSnap(SNAP_METHODS.protected.identity.unlinkAll, body);
  }

  async showICRC1TransferConfirm(body: IShowICRC1TransferConfirmRequest): Promise<boolean> {
    return await this.inner._requestSnap(SNAP_METHODS.protected.icrc1.showTransferConfirm, body);
  }

  async getStats(): Promise<IStatistics> {
    return await this.inner._requestSnap(SNAP_METHODS.protected.statistics.get);
  }

  async resetStats(): Promise<true> {
    return await this.inner._requestSnap(SNAP_METHODS.protected.statistics.reset);
  }

  constructor(private readonly inner: MasqueradeClient) {}
}
