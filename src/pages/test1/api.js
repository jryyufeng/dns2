import host from '@common/utils/get-api-host';
import {fetchApi} from '@common/utils/fetch';

export default {
    // 企业详情跳转页面
    test (params) {
        return fetchApi({
            url: `${host.localHost}/ssm/getNodes`,
            params
        });
    }
};
