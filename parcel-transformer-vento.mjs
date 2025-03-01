// @ts-check
import vento from "ventojs";
import { Transformer } from "@parcel/plugin";

const defaultLocals = {
  prismUrl: "/prism.js",
  staticRoot: "/",
  cssUrl: "/src/css/index.scss",
  jsUrl: "/src/js/index.ts"
}

export default new Transformer({
    async loadConfig({config}) {
        const results = await config.getConfig([
            '.ventorc',
            'vento.config.json',
            'vento.config.js',
            'vento.config.mjs',
        ]);

        if(!results){
            return {}
        }

        const { contents, filePath:_ } = results;

        return contents;
    },
    async transform({asset, config}) {
        const env = vento({
            ...config
        });

        if (config.register) {
            config.register({
                vento,
                env,
                asset,
            });
        }


        // Render the asset
        asset.type = 'html';

        const template = await env.load(asset.filePath);
        const result = await template(defaultLocals);

        asset.setCode(result.content);

        return [asset];
    },
});