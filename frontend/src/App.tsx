import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiClient, type PredictRequest } from '@/lib/api'

function App() {
	const [formData, setFormData] = useState<PredictRequest>({
		jumlah_penjualan: 0,
		harga: 0,
		diskon: 0,
	})
	const [prediction, setPrediction] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setPrediction(null)

		try {
			const result = await apiClient.predict(formData)
			setPrediction(result.prediction)
		} catch (err) {
			setError('Failed to get prediction. Make sure the backend is running.')
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (field: keyof PredictRequest, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: parseInt(value) || 0
		}))
	}

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Sales Prediction</CardTitle>
					<CardDescription>
						Enter sales data to predict the category
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Jumlah Penjualan</label>
							<Input
								type="number"
								placeholder="Enter sales quantity"
								value={formData.jumlah_penjualan || ''}
								onChange={(e) => handleChange('jumlah_penjualan', e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Harga</label>
							<Input
								type="number"
								placeholder="Enter price"
								value={formData.harga || ''}
								onChange={(e) => handleChange('harga', e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Diskon</label>
							<Input
								type="number"
								placeholder="Enter discount"
								value={formData.diskon || ''}
								onChange={(e) => handleChange('diskon', e.target.value)}
							/>
						</div>

						{error && (
							<p className="text-red-500 text-sm">{error}</p>
						)}

						{prediction !== null && (
							<div className="p-4 bg-green-50 rounded-lg">
								<p className="text-sm font-medium text-green-800">Prediction:</p>
								<p className="text-2xl font-bold text-green-700">{prediction}</p>
							</div>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? 'Predicting...' : 'Predict'}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}

export default App
