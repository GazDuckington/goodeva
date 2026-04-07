import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json',
	},
});

export interface PredictRequest {
	jumlah_penjualan: number;
	harga: number;
	diskon: number;
}

export interface PredictResponse {
	prediction: number;
}

export interface RetrainResponse {
	message: string;
}

export const apiClient = {
	predict: async (data: PredictRequest): Promise<PredictResponse> => {
		const response = await api.post<PredictResponse>('/predict', data);
		return response.data;
	},

	retrain: async (): Promise<RetrainResponse> => {
		const response = await api.post<RetrainResponse>('/retrain');
		return response.data;
	},

	healthCheck: async (): Promise<{ message: string }> => {
		const response = await api.get('/');
		return response.data;
	},
};

export default api;
