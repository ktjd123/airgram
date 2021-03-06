import { ag, TdProvider } from 'airgram-core'
import { TdJsonClient, TdJsonClientConfig } from './TdJsonClient'

export type TdJsonProviderConfig = ag.Omit<TdJsonClientConfig, 'handleUpdate' | 'handleError' | 'models'>

export class TdJsonProvider extends TdProvider<TdJsonClient> {
  public constructor (private config: TdJsonProviderConfig = {}) {
    super()
  }

  public destroy (): void {
    this.client.destroy()
  }

  public initialize (
    handleUpdate: (update: ag.TdUpdate) => Promise<any>,
    handleError: (error: any) => void,
    models?: ag.PlainObjectToModelTransformer
  ): void {
    this.client = new TdJsonClient({ ...this.config, handleUpdate, handleError, models })
  }

  public pause (): void {
    this.client.pause()
  }

  public resume (): void {
    this.client.resume()
  }

  public send (request: ag.ApiRequest): Promise<ag.TdResponse> {
    return this.client.send(request)
  }
}
