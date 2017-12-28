<!--pages/apply/carApply/carApply.wxml-->
<!--bx_apply.wxml-->
<view class="container">
    <view class="repair-detail">
        <view class="repair-detail-item {{(showError&&!serviceTypeValue)?'error':''}}">
            <view class="repair-detail-item-hd">
                <text class="repair-detail-name">服务类型</text>
                <view class="repair-detail-item-ft">
                    <picker class="repair-detail-picker" bindchange="listenerServiceType"
                            value="{{serviceTypeValue}}" range="{{serviceTypeRange}}">
                        <view class="repair-detail-content">
                            <text wx:if="{{serviceTypeValue === false}}" class="repair-detail-info">请选择服务类型</text>
                            <text wx:else class="repair-detail-info">{{serviceTypeRange[serviceTypeValue]}}</text>
                            <image class="more-icon" src="/images/more/enter.png"></image>
                        </view>
                    </picker>
                </view>
            </view>
        </view>
        <view class="repair-detail-item {{(showError&&!serviceObjectValue)?'error':''}}">
            <view class="repair-detail-item-hd">
                <text class="repair-detail-name">服务项目</text>
                <view class="repair-detail-item-ft">
                    <picker class="repair-detail-picker" bindchange="listenerServiceObject"
                            value="{{serviceObjectValue}}" range="{{serviceObjectRange}}"
                            disabled="{{!serviceTypeValue}}">
                        <view class="repair-detail-content">
                            <text wx:if="{{!serviceTypeValue}}" class="repair-detail-info disabled">请先选择服务类型</text>
                            <text wx:elif="{{serviceObjectValue === false}}" class="repair-detail-info">请选择服务项目
                            </text>
                            <text wx:else class="repair-detail-info">{{serviceObjectRange[serviceObjectValue]}}
                            </text>
                            <image class="more-icon" src="/images/more/enter.png"></image>
                        </view>
                    </picker>
                </view>
            </view>
        </view>
        <view class="repair-detail-item {{(showError&&!serviceAreaValue)?'error':''}}">
            <view class="repair-detail-item-hd">
                <text class="repair-detail-name">服务区域</text>
                <view class="repair-detail-item-ft">
                    <picker class="repair-detail-picker" bindchange="listenerServiceArea"
                            value="{{serviceAreaValue}}" range="{{serviceAreaRange}}">
                        <view class="repair-detail-content">
                            <text wx:if="{{serviceAreaValue === false}}" class="repair-detail-info">请选择服务区域</text>
                            <text wx:else class="repair-detail-info">{{serviceAreaRange[serviceAreaValue]}}</text>
                            <image class="more-icon" src="/images/more/enter.png"></image>
                        </view>
                    </picker>
                </view>
            </view>
        </view>
    </view>

    <view class="reporter-detail">
        <view class="reporter-user reporter-detail-item">
            <text class="reporter-detail-name">报修人</text>
            <view class="reporter-detail-input">
                <input value="{{formData.Name}}（{{formData.Id}}）" disabled="true"/>
            </view>
        </view>
        <view class="reporter-tel reporter-detail-item {{(showError&&!formData.Phone)?'error':''}}">
            <text class="reporter-detail-name">联系电话</text>
            <view class="reporter-detail-input">
                <input type="number" maxlength="11" placeholder="请输入联系电话" bindinput="listenerTel"/>
            </view>
        </view>
        <view class="reporter-address reporter-detail-item {{(showError&&!formData.Address)?'error':''}}">
            <text class="reporter-detail-name">报修地址</text>
            <view class="reporter-detail-input">
                <input type="text" placeholder="请输入地址" bindinput="listenerAddress"/>
            </view>
        </view>
    </view>

    <view class="declare-context">
        <text class="declare-context-title">申报内容</text>
        <view class="declare-context-panel">
            <view class="declare-context-input {{(showError&&!formData.Title)?'error':''}}">
                <input placeholder="请输入报修标题" bindinput="listenerTitle"/>
            </view>
            <textarea cursor-spacing="50"
                      class="declare-context-textarea {{(showError&&!formData.Content)?'error':''}}"
                      placeholder="请输入具体内容" bindinput="listenerTextarea"></textarea>
        </view>
    </view>

    <view class="submit-declare" bindtap="submitApply">
        <text>提交申请</text>
    </view>
</view>
